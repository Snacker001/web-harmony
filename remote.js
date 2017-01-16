'use strict';
 var   HarmonyUtils = require('harmony-hub-util'),
    harmony_clients = {},
    MAX_ACTIVITY_WAIT_TIME_MS = 15000;

function dostuff(hub_ip, req, amt, res) {
	switch(req){
		case 'pause':
			pause(hub_ip, req, amt, res);
			break;
		case 'play':
			play(hub_ip, req, amt, res);
			break;
		case 'volume_up':
			volume_up(hub_ip, req, amt, res);
			break;
		case 'volume_down':
			volume_down(hub_ip, req, amt, res);
			break;
		case 'mute':
			mute(hub_ip, req, amt, res);
			break;
		case 'unmute':
			mute(hub_ip, req, amt, res);
			break;
		case 'left':
			left(hub_ip, req, amt, res);
			break;
		case 'right':
			right(hub_ip, req, amt, res);
			break;
		case 'up':
			up(hub_ip, req, amt, res);
			break;
		case 'down':
			down(hub_ip, req, amt, res);
			break;
		case 'select':
			select(hub_ip, req, amt, res);
			break;
		case 'home':
			home(hub_ip, req, amt, res);
			break;
		case 'go_home':
			home(hub_ip, req, amt, res);
			break;
		case 'menu':
			menu(hub_ip, req, amt, res);
			break;
		case 'press_menu':
			menu(hub_ip, req, amt, res);
			break;
		case 'open_menu':
			menu(hub_ip, req, amt, res);
			break;
		case 'back':
			back(hub_ip, req, amt, res);
			break;
		case 'go_back':
			back(hub_ip, req, amt, res);
			break;
		case 'channel':
			channel(hub_ip, req, amt, res);
			break;

		default:
			console.log("unknown command");
	}

}



function pause(hub_ip, req, amt, res) {
        console.log('Pausing');
        execCmdCurrentActivity(hub_ip, 'TransportBasic,Pause', amt, function (res) {
            console.log("Command " + req + " was executed with result : " + res);
        });
    }

function play(hub_ip, req, amt, res) {
        console.log('Playing');
        execCmdCurrentActivity(hub_ip, 'TransportBasic,Play', amt, function (res) {
            console.log("Command " + req + " was executed with result : " + res);
        });
    }

function volume_up(hub_ip, req, amt, res) {
        console.log('Increasing Volume');
	if(hub_ip === '192.168.0.104') {
	amt = amt * 2;
	}
        execCmdCurrentActivity(hub_ip, 'Volume,Volume Up', amt, function (res) {
            console.log("Command " + req + " was executed with result : " + res);
        });
    }

function volume_down(hub_ip, req, amt, res) {
        console.log('Decreasing Volume');
	if(hub_ip === '192.168.0.104') {
	amt = amt * 2;
	}
        execCmdCurrentActivity(hub_ip, 'Volume,Volume Down', amt, function (res) {
            console.log("Command " + req + " was executed with result : " + res);
        });
    }

function mute(hub_ip, req, amt, res) {
        console.log('Muting Volume');
        execCmdCurrentActivity(hub_ip, 'Volume,Mute', amt, function (res) {
            console.log("Command " + req + " was executed with result : " + res);
        });
    }

function left(hub_ip, req, amt, res) {
        console.log('Direction Left ' + amt);
        execCmdCurrentActivity(hub_ip, 'NavigationBasic,Direction Left', amt, function (res) {
            console.log("Command " + req + " was executed with result : " + res);
        });
    }

function right(hub_ip, req, amt, res) {
        console.log('Direction Right ' + amt);
        execCmdCurrentActivity(hub_ip, 'NavigationBasic,Direction Right', amt, function (res) {
            console.log("Command " + req + " was executed with result : " + res);
        });
    }

function up(hub_ip, req, amt, res) {
        console.log('Direction Up ' + amt);
        execCmdCurrentActivity(hub_ip, 'NavigationBasic,Direction Up', amt, function (res) {
            console.log("Command " + req + " was executed with result : " + res);
        });
    }

function down(hub_ip, req, amt, res) {
        console.log('Direction Down ' + amt);
        execCmdCurrentActivity(hub_ip, 'NavigationBasic,Direction Down', amt, function (res) {
            console.log("Command " + req + " was executed with result : " + res);
        });
    }

function select(hub_ip, req, amt, res) {
        console.log('Selecting');
        execCmdCurrentActivity(hub_ip, 'NavigationBasic,Select', amt, function (res) {
            console.log("Command " + req + " was executed with result : " + res);
        });
    }

function home(hub_ip, req, amt, res) {
        console.log('Going Home');
        execCmdCurrentActivity(hub_ip, 'GameType3,Home', amt, function (res) {
            console.log("Command " + req + " was executed with result : " + res);
        });
    }

function menu(hub_ip, req, amt, res) {
        console.log('Pressing Menu');
        execCmdCurrentActivity(hub_ip, 'NavigationDVD,Menu', amt, function (res) {
            console.log("Command " + req + " was executed with result : " + res);
        });
    }

function back(hub_ip, req, amt, res) {
        console.log('Going Back');
        execCmdCurrentActivity(hub_ip, 'NavigationDVD,Back', amt, function (res) {
            console.log("Command " + req + " was executed with result : " + res);
        });
    }

function channel(hub_ip, req, amt, res) {
        console.log('Selecting Channel' + amt);
	var tens = Math.floor(amt/10);
	var ones = amt%10;
	if (amt>=10) {
			execCmdCurrentActivity(hub_ip, 'NumericBasic,'+tens, 1, function (res)	{
            console.log("Command Channel Number was executed with result : " + res);
			execCmdCurrentActivity(hub_ip, 'NumericBasic,'+ones, 1, function (res) {
            console.log("Command " + req + " was executed with result : " + res);
			});
			});
		} else {
			execCmdCurrentActivity(hub_ip, 'NumericBasic,'+ones, 1, function (res) {
            console.log("Command " + req + " was executed with result : " + res);
			});
		} 
    }


function execCmdDF(hutils, is_device, dev_or_act, cmd, cnt, fn, res) {
    console.log("execCmd called with cnt = " + cnt + " is_dev " + is_device +
                " dev/act " + dev_or_act + " cmd = " + cmd);
    if (cnt === 0) {
        fn(res);
        hutils.end();
        return;
    }
    hutils.executeCommand(is_device, dev_or_act, cmd).then(function (res) {
        console.log(cnt + ". Command " + cmd + " to device/activity " +
                    dev_or_act + " was executed with result : " + res);
        if (res) {
            setTimeout(function () {
                execCmdDF(hutils, is_device, dev_or_act, cmd, cnt - 1, fn, res);
            }, 100);
        }
    }, function(err) {
        console.log("ERROR Occured " + err);
        console.log("      stack " + err.stack);
    });
}


function execCmdCurrentActivity(hub_ip, cmd, cnt, fn, res) {
    new HarmonyUtils(hub_ip).then(function (hutils) {
        hutils.readCurrentActivity().then(function (current_activity) {
            execCmdDF(hutils, false, current_activity, cmd, cnt, fn, res);
        });
    });
}



exports.dostuff = dostuff;


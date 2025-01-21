// Stats: "Auth" : '["0-Games", "1-Wins", "2-Draws", "3-Losses", "4-Winrate", "5-Goals", "6-Assists", "7-GK", "8-CS", "9-CS%", "10-Role", "11-Nick", "12-OwnGoals", "13-Celeb"]'

/* VARIABLES */

/* ROOM */
import HaxballJS from "haxball.js";
import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";
import path from "path";
import { clearInterval } from "timers";
// You don't need to import 'json' from 'stream/consumers' as it's not used directly
// If it's used elsewhere, make sure you use a proper import statement
import { json } from "stream/consumers";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");
async function longScript() {
  const discord_errors_webhook =
    "https://discord.com/api/webhooks/1330932544060784640/X49W9eEZ158jqk8_Gpxq6Yv1UApKTAD9EK3G3V8BuYQ7enldzAXE0AfPrTE_D324H-_w";
  const code_chnage_webhook = "";
  const log_cmd_used_webhook = "";
  const discord_chat_log_webhook = "";
  const sendAnnouncementToDiscord_webhook = "";
  const discord_scores_log_webhook = "";
  // './scratch' is the directory where data will be stored

  HaxballJS.then((HBInit) => {
    const room = HBInit({
      roomName: "🏆🔥 Futsal Arena | GFL | S3 🔥🏆", // roomName from config
      maxPlayers: 30, // maxPlayers from config
      public: true, // roomPublic from config
      playerName: "Avraa", // botName from config
      geo: { code: "ES", lat: 40.463667, lon: -3.74922 }, // geo from config
      token: "thr1.AAAAAGeQDk1EOnPQ55qJOw.d-0e_XlyiLk", // token from config
    });

    const scoreLimitClassic = 3;
    const scoreLimitBig = 3;
    const timeLimitClassic = 3;
    const timeLimitBig = 3;
    room.setTeamsLock(true);
    var teleportON = false;
    var followON = false;
    var gayawayON = false;
    var curveON = false;
    var supersON = true;
    var redodds,
      blueodds = 0;
    var gamebets = [];
    const betweights = {
      1: 0.4 / 1.5,
      5: 0.2 / 1.5,
      6: 0.15 / 1.5,
      7: 0.1 / 1.5,
      8: 0.05 / 1.5,
      12: -0.2 / 1.5,
      3: -0.4 / 1.5,
    };
    var betTax = 10;
    var curveAng = 500;
    let segundos = 0;
    var bettimeout = false;
    // var teleport = setInterval(function () {
    //     if( teamR && teamR.length > 0 && !endGameVariable && teleportON){
    //         for (var i = 0; i < teamR.length; i++) {
    //             room.setPlayerDiscProperties(teamR[i].id, {
    //             x: room.getBallPosition().x + Math.random() * 200,
    //             y: room.getBallPosition().y + Math.random() * 200
    //             });
    //         }
    //     }
    //     if( teamB && teamB.length > 0 && !endGameVariable && teleportON){
    //         for (var i = 0; i < teamB.length; i++) {
    //             room.setPlayerDiscProperties(teamB[i].id, {
    //             x: room.getBallPosition().x + Math.random() * 200,
    //             y: room.getBallPosition().y + Math.random() * 200
    //             });
    //         }
    //     }
    // }, 5000);

    //   setInterval(function () {
    //     room.sendAnnouncement(
    //       "New Powerup !curve, to Curve Ball around Players.",
    //       null,
    //       0xff8a4a,
    //       "normal"
    //     );
    //   }, 240000);

    //   setInterval(function () {
    //     room.sendAnnouncement(
    //       "New Powerup for Vips, !knife to turn off all powers for 30s.",
    //       null,
    //       0xff8a4a,
    //       "normal"
    //     );
    //   }, 120000);

    setInterval(function () {
      room.sendAnnouncement(
        "Use !celeblist to choose your scorer celebration!",
        null,
        0xeac274,
        "bold"
      );
    }, 180000);

    room.setTeamColors(1, 60, 0x000000, [0x8f1a22, 0x8f1a22, 0x8f1a22]);
    room.setTeamColors(2, 60, 0x000000, [0x046f8f, 0x046f8f, 0x046f8f]);

    let Cor = {
      Vermelho: 0xfa5646,
      Laranja: 0xffc12f,
      Verde: 0x7dfa89,
      Azul: 0x05c5ff,
      Amarelo: 0xffff17,
      Cinza: 0xcccccc,
      Branco: 0xffffff,
      Azulclaro: 0x6ecaff,
      Powderblue: 0xb0e0e6,
      Roxo: 0x800080,
      Platinum: 0xe5e4e2,
      Gold: 0xffd700,
      Silver: 0xd5d5d5,
      Bronze: 0x896728,
      Thistle: 0xd8bfd8,
      Khaki: 0xf0e68c,
      AliceBlue: 0xf0f8ff,
      GhostWhite: 0xf8f8ff,
      Snow: 0xfffafa,
      Seashell: 0xfff5ee,
      FloralWhite: 0xfffaf0,
      WhiteSmoke: 0xf5f5f5,
      Beige: 0xf5f5dc,
      OldLace: 0xfdf5e6,
      Ivory: 0xfffff0,
      Linen: 0xfaf0e6,
      Cornsilk: 0xfff8dc,
      AntiqueWhite: 0xfaebd7,
      BlanchedAlmond: 0xffebcd,
      Bisque: 0xffe4c4,
      LightYellow: 0xffffe0,
      LemonChiffon: 0xfffacd,
      LightGoldenrodYellow: 0xfafad2,
      PapayaWhip: 0xffefd5,
      PeachPuff: 0xffdab9,
      Moccasin: 0xffe4b5,
      PaleGoldenrod: 0xeee8aa,
      Azulescuro: 0x426ad6,
      Warn: 0xff9966,
    };

    const Negrito = "bold";
    const Normal = "normal";
    // const resetarAvatarEm = 3;

    var adminPassword = 3000;
    console.log("adminPassword : " + adminPassword);

    /* STADIUM */
    var chatLock = false;
    // var automsg;
    var ballRadius = 6.25;
    var color_team1_a = 60,
      color_team2_a = 60,
      color_team1_t = "0x000000",
      color_team2_t = "0x000000";
    var color_team1 = ["0x8F1A22", "0x8F1A22", "0x8F1A22"],
      color_team2 = ["0x046F8F", "0x046F8F", "0x046F8F"];
    const playerRadius = 15;
    var ballRadius = 10;
    const triggerDistance = playerRadius + ballRadius + 0.01;
    const aloneMap = `{"name":"MA | SOLO by Simo","width":200,"height":130,"bg":{"kickOffRadius":45,"color":"34414B"},"vertexes":[{"x":176.5,"y":-100,"cMask":[]},{"x":175,"y":-101.5,"cMask":[]},{"x":-176.5,"y":-100,"cMask":[]},{"x":-175,"y":-101.5,"cMask":[]},{"x":-176.5,"y":100,"cMask":[]},{"x":-175,"y":101.5,"cMask":[]},{"x":176.5,"y":100,"cMask":[]},{"x":175,"y":101.5,"cMask":[]},{"x":0,"y":-98.6,"cMask":[],"color":"a3acc2"},{"x":0,"y":-46,"cMask":[],"color":"a3acc2"},{"x":0,"y":-45,"cMask":[],"color":"a3acc2"},{"x":0,"y":45,"cMask":[],"color":"a3acc2"},{"x":0,"y":46,"cMask":[],"color":"a3acc2"},{"x":0,"y":98.6,"cMask":[],"color":"a3acc2"},{"x":0,"y":1.5,"cMask":["wall"],"cGroup":["wall"],"curve":180},{"x":0,"y":-1.5,"cMask":["wall"],"cGroup":["wall"],"curve":180},{"x":0,"y":-1.5,"cMask":["wall"],"cGroup":["wall"],"curve":180},{"x":0,"y":1.5,"cMask":["wall"],"cGroup":["wall"],"curve":180}],"segments":[{"v0":0,"v1":2,"color":"151A1E","cMask":["ball"],"bias":10},{"v0":3,"v1":5,"color":"151A1E","cMask":["ball"],"bias":10},{"v0":4,"v1":6,"color":"151A1E","cMask":["ball"],"bias":10},{"v0":7,"v1":1,"color":"151A1E","cMask":["ball"],"bias":10},{"v0":8,"v1":9,"color":"a3acc2","cMask":[]},{"v0":12,"v1":13,"color":"a3acc2","cMask":[]},{"v0":10,"v1":11,"curve":180,"color":"a3acc2","cMask":[],"curveF":6.123233995736766e-17},{"v0":11,"v1":10,"curve":180,"color":"a3acc2","cMask":[],"curveF":6.123233995736766e-17},{"v0":14,"v1":15,"curve":180,"color":"a3acc2","cMask":["wall"],"cGroup":["wall"]},{"v0":16,"v1":17,"curve":180,"color":"a3acc2","cMask":["wall"],"cGroup":["wall"]}],"planes":[],"goals":[],"discs":[],"playerPhysics":{"damping": 0.965,"kickingDamping" : 0.9649,"bCoef":0,"acceleration":0.11,"kickingAcceleration":0.083,"kickStrength":4.2},"ballPhysics":{"radius":5.8,"invMass":1.5,"color":"FFF26D","bCoef":0.412,"cGroup":["ball","kick","score"]},"traits":[],"joints":[],"redSpawnPoints":[],"blueSpawnPoints":[],"canBeStored":false}`;
    const classicMap = `{ "name" : "MA | SMALL by Adl", "width" : 430, "height" : 200, "bg" : { "type" : "", "color" : "34414B", "width" : 0, "height" : 0 }, "vertexes" : [ /* 0 */ { "x" : 0, "y" : 200, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] }, /* 1 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "a3acc2" }, /* 2 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "a3acc2" }, /* 3 */ { "x" : 0, "y" : -200, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] }, /* 4 */ { "x" : -368, "y" : -65, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 2, "color" : "ffffff" }, /* 5 */ { "x" : -400, "y" : -65, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 0 }, /* 6 */ { "x" : -400, "y" : 65, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 0 }, /* 7 */ { "x" : -368, "y" : 65, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 2, "color" : "ffffff" }, /* 8 */ { "x" : 368, "y" : -65, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : -2, "color" : "ffffff" }, /* 9 */ { "x" : 400, "y" : -65, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 0 }, /* 10 */ { "x" : 400, "y" : 65, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 0 }, /* 11 */ { "x" : 368, "y" : 65, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : -2, "color" : "ffffff" }, /* 12 */ { "x" : -368, "y" : 65, "bCoef" : 1.1, "cMask" : ["ball" ], "color" : "ffffff", "bias" : 32 }, /* 13 */ { "x" : -368, "y" : 171.5, "bCoef" : 1.1, "cMask" : ["ball" ], "color" : "151A1E", "bias" : 32 }, /* 14 */ { "x" : -368, "y" : -65, "bCoef" : 1.1, "cMask" : ["ball" ], "color" : "ffffff", "bias" : -32 }, /* 15 */ { "x" : -368, "y" : -171.5, "bCoef" : 1.1, "cMask" : ["ball" ], "color" : "151A1E", "bias" : -32 }, /* 16 */ { "x" : -368, "y" : 170, "bCoef" : 1.3, "cMask" : ["ball" ], "color" : "151A1E" }, /* 17 */ { "x" : 368, "y" : 170, "bCoef" : 1.3, "cMask" : ["ball" ], "color" : "151A1E" }, /* 18 */ { "x" : 368, "y" : 65, "bCoef" : 1.1, "cMask" : ["ball" ], "color" : "ffffff", "bias" : -32 }, /* 19 */ { "x" : 368, "y" : 171.5, "bCoef" : 1.1, "cMask" : ["ball" ], "color" : "151A1E", "bias" : -32 }, /* 20 */ { "x" : 368, "y" : -171.5, "bCoef" : 1.1, "cMask" : ["ball" ], "color" : "151A1E", "bias" : -32 }, /* 21 */ { "x" : 368, "y" : -65, "bCoef" : 1.1, "cMask" : ["ball" ], "color" : "ffffff", "bias" : -32 }, /* 22 */ { "x" : -368, "y" : -170, "cMask" : ["ball" ], "color" : "151A1E" }, /* 23 */ { "x" : 368, "y" : -170, "cMask" : ["ball" ], "color" : "151A1E" }, /* 24 */ { "x" : 0, "y" : -170, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "a3acc2" }, /* 25 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "a3acc2", "curve" : 0 }, /* 26 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "a3acc2" }, /* 27 */ { "x" : 0, "y" : 170, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "a3acc2" }, /* 28 */ { "x" : -366.5, "y" : 122, "bCoef" : 0.1, "cMask" : [ ], "color" : "a3acc2" }, /* 29 */ { "x" : -366.5, "y" : -122, "bCoef" : 0.1, "cMask" : [ ], "color" : "a3acc2" }, /* 30 */ { "x" : 366.5, "y" : 122, "bCoef" : 0.1, "cMask" : [ ], "color" : "a3acc2" }, /* 31 */ { "x" : 366.5, "y" : -122, "bCoef" : 0.1, "cMask" : [ ], "color" : "a3acc2" }, /* 32 */ { "x" : -368, "y" : 65, "bCoef" : 0.1, "cMask" : [ ], "color" : "ffffff", "curve" : 0 }, /* 33 */ { "x" : -368, "y" : -65, "bCoef" : 0.1, "cMask" : [ ], "color" : "ffffff", "curve" : 0 }, /* 34 */ { "x" : 368, "y" : 65, "bCoef" : 0.1, "cMask" : [ ], "color" : "ffffff", "curve" : 0 }, /* 35 */ { "x" : 368, "y" : -65, "bCoef" : 0.1, "cMask" : [ ], "color" : "ffffff", "curve" : 0 }, /* 36 */ { "x" : 0, "y" : 1.5, "bCoef" : 0.1, "cMask" : ["wall" ], "cGroup" : ["wall" ] }, /* 37 */ { "x" : 0, "y" : -1.5, "bCoef" : 0.1, "cMask" : ["wall" ], "cGroup" : ["wall" ] }, /* 38 */ { "x" : 0, "y" : -1.5, "bCoef" : 0.1, "cMask" : ["wall" ], "cGroup" : ["wall" ] }, /* 39 */ { "x" : 0, "y" : 1.5, "bCoef" : 0.1, "cMask" : ["wall" ], "cGroup" : ["wall" ] } ], "segments" : [ { "v0" : 4, "v1" : 5, "color" : "DB7F89", "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 2, "y" : -65 }, { "v0" : 5, "v1" : 6, "color" : "DB7F89", "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 0, "x" : -400 }, { "v0" : 6, "v1" : 7, "color" : "DB7F89", "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 2, "y" : 65 }, { "v0" : 8, "v1" : 9, "color" : "7FA8DB", "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : -2, "y" : -65 }, { "v0" : 9, "v1" : 10, "color" : "7FA8DB", "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 0 }, { "v0" : 10, "v1" : 11, "color" : "7FA8DB", "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : -2, "y" : 65 }, { "v0" : 0, "v1" : 1, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] }, { "v0" : 1, "v1" : 2, "curve" : 180, "color" : "a3acc2", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ] }, { "v0" : 2, "v1" : 1, "curve" : 180, "color" : "a3acc2", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ] }, { "v0" : 2, "v1" : 3, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] }, { "v0" : 12, "v1" : 13, "color" : "151A1E", "bCoef" : 1.1, "cMask" : ["ball" ], "bias" : 32, "x" : -368 }, { "v0" : 14, "v1" : 15, "color" : "151A1E", "bCoef" : 1.1, "cMask" : ["ball" ], "bias" : -32, "x" : -368 }, { "v0" : 16, "v1" : 17, "color" : "151A1E", "cMask" : ["ball" ], "y" : 170 }, { "v0" : 18, "v1" : 19, "color" : "151A1E", "bCoef" : 1.1, "cMask" : ["ball" ], "bias" : -32, "x" : 368 }, { "v0" : 20, "v1" : 21, "color" : "151A1E", "bCoef" : 1.1, "cMask" : ["ball" ], "bias" : -32, "x" : 368 }, { "v0" : 22, "v1" : 23, "color" : "151A1E", "bCoef" : 2, "cMask" : ["ball" ], "y" : -170 }, { "v0" : 24, "v1" : 25, "color" : "a3acc2", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] }, { "v0" : 26, "v1" : 27, "color" : "a3acc2", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] }, { "v0" : 29, "v1" : 28, "curve" : 180, "color" : "a3acc2", "bCoef" : 0.1, "cMask" : [ ] }, { "v0" : 30, "v1" : 31, "curve" : 180, "color" : "a3acc2", "bCoef" : 0.1, "cMask" : [ ] }, { "v0" : 33, "v1" : 32, "curve" : 0, "color" : "ffffff", "bCoef" : 0.1, "cMask" : [ ] }, { "v0" : 35, "v1" : 34, "curve" : 0, "color" : "ffffff", "bCoef" : 0.1, "cMask" : [ ], "x" : 368 }, { "v0" : 36, "v1" : 37, "curve" : 180, "color" : "a3acc2", "bCoef" : 0.1, "cMask" : ["wall" ], "cGroup" : ["wall" ] }, { "v0" : 38, "v1" : 39, "curve" : 180, "color" : "a3acc2", "bCoef" : 0.1, "cMask" : ["wall" ], "cGroup" : ["wall" ] } ], "planes" : [ { "normal" : [0,1 ], "dist" : -170, "bCoef" : 1.1, "cMask" : ["ball" ] }, { "normal" : [0,-1 ], "dist" : -170, "bCoef" : 1.1, "cMask" : ["ball" ] }, { "normal" : [0,1 ], "dist" : -200, "bCoef" : 0.1 }, { "normal" : [0,-1 ], "dist" : -200, "bCoef" : 0.1 }, { "normal" : [1,0 ], "dist" : -430, "bCoef" : 0.1 }, { "normal" : [-1,0 ], "dist" : -430, "bCoef" : 0.1 }, { "normal" : [1,0 ], "dist" : -400, "bCoef" : 0.1, "cMask" : ["ball" ] }, { "normal" : [-1,0 ], "dist" : -400, "bCoef" : 0.1, "cMask" : ["ball" ] } ], "goals" : [ { "p0" : [-368,-65 ], "p1" : [-368,65 ], "team" : "red", "color" : "ffffff" }, { "p0" : [368,65 ], "p1" : [368,-65 ], "team" : "blue", "color" : "ffffff" } ], "discs" : [ { "radius" : 4.5, "invMass" : 0, "pos" : [-368,65 ], "color" : "ffffff" }, { "radius" : 4.5, "invMass" : 0, "pos" : [-368,-65 ], "color" : "ffffff" }, { "radius" : 4.5, "invMass" : 0, "pos" : [368,65 ], "color" : "ffffff" }, { "radius" : 4.5, "invMass" : 0, "pos" : [368,-65 ], "color" : "ffffff" }, { "radius" : 4.5, "invMass" : 0, "pos" : [1000,1000 ], "color" : "ffffff" }, { "radius" : 4.5, "invMass" : 0, "pos" : [-1000,1000 ], "color" : "ffffff" }, { "radius" : 4.5, "invMass" : 0, "pos" : [1000,-1000 ], "color" : "ffffff" }, { "radius" : 4.5, "invMass" : 0, "pos" : [-1000,-1000 ], "color" : "ffffff" } ], "playerPhysics" : { "damping" : 0.965, "kickingDamping" : 0.9649, "bCoef" : 0.15, "acceleration" : 0.11, "kickingAcceleration" : 0.083, "kickStrength" : 4.6 }, "ballPhysics" : { "radius" : 5.8, "invMass" : 1.5, "color" : "FFF26D", "bCoef" : 0.412, "cGroup" : [ "ball", "kick", "score" ] }, "spawnDistance" : 180, "traits" : { }, "joints" : [ ], "redSpawnPoints" : [ ], "blueSpawnPoints" : [ ], "canBeStored" : false }`;
    const bigMap = `{ "name" : "HHL 3V3 by Bnz", "width" : 620, "height" : 280, "bg" : { "type" : "", "color" : "27343E", "width" : 0, "height" : 0 }, "vertexes" : [ /* 0 */ { "x" : -551.5, "y" : -240, "cMask" : [ ], "cGroup" : [ ], "color" : "FFFFFF" }, /* 1 */ { "x" : 551.5, "y" : -240, "cMask" : [ ], "cGroup" : [ ], "color" : "FFFFFF" }, /* 2 */ { "x" : 551.5, "y" : 240, "cMask" : [ ], "cGroup" : [ ], "color" : "FFFFFF" }, /* 3 */ { "x" : -551.5, "y" : 240, "cMask" : [ ], "cGroup" : [ ], "color" : "FFFFFF" }, /* 4 */ { "x" : 0, "y" : 240, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 5 */ { "x" : 0, "y" : -240, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 6 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["redKO","blueKO" ], "cGroup" : ["wall" ], "color" : "747F90", "bias" : 0, "vis" : true }, /* 7 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["redKO","blueKO" ], "cGroup" : ["wall" ], "color" : "747F90", "bias" : 0, "vis" : true }, /* 8 */ { "x" : -551.5, "y" : 85, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 9 */ { "x" : -551.5, "y" : -85, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 10 */ { "x" : 551.5, "y" : -85, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 11 */ { "x" : 551.5, "y" : 85, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 12 */ { "x" : 580.9472613916666, "y" : -85, "bCoef" : 10, "cMask" : ["c2","ball" ], "cGroup" : ["wall" ], "color" : "747F90", "bias" : -9 }, /* 13 */ { "x" : 580.9472613916666, "y" : 85, "bCoef" : 10, "cMask" : ["c2","ball" ], "cGroup" : ["wall" ], "color" : "747F90", "bias" : -9 }, /* 14 */ { "x" : -580.1530147481326, "y" : -85, "bCoef" : 10, "cMask" : ["c2","ball" ], "cGroup" : ["wall" ], "color" : "747F90", "bias" : 9 }, /* 15 */ { "x" : -580.1530147481326, "y" : 85, "bCoef" : 10, "cMask" : ["c2","ball" ], "cGroup" : ["wall" ], "color" : "747F90", "bias" : 9 }, /* 16 */ { "x" : -330, "y" : -239.40939597315437, "cMask" : [ ], "cGroup" : [ ], "trait" : "threeDefLine", "color" : "747F90", "vis" : true, "bias" : 0 }, /* 17 */ { "x" : -330, "y" : 239.40939597315437, "cMask" : [ ], "cGroup" : [ ], "trait" : "threeDefLine", "color" : "747F90", "vis" : true, "bias" : 0 }, /* 18 */ { "x" : 330, "y" : -239.40939597315437, "cMask" : [ ], "cGroup" : [ ], "trait" : "threeDefLine", "color" : "747F90", "vis" : true, "bias" : 0 }, /* 19 */ { "x" : 330, "y" : 239.40939597315437, "cMask" : [ ], "cGroup" : [ ], "trait" : "threeDefLine", "color" : "747F90", "vis" : true, "bias" : 0 }, /* 20 */ { "x" : 550.2571942446043, "y" : 125, "cMask" : ["c1" ], "cGroup" : ["c1" ], "color" : "747F90", "bias" : 10 }, /* 21 */ { "x" : 550.2571942446043, "y" : -125, "cMask" : ["all" ], "cGroup" : [ ], "color" : "747F90", "bias" : 10 }, /* 22 */ { "x" : 495.19208633093524, "y" : -125, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 23 */ { "x" : 495.19208633093524, "y" : 125, "cMask" : ["wall" ], "cGroup" : ["wall" ], "color" : "747F90" }, /* 24 */ { "x" : 330, "y" : -101.47651006711409, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 25 */ { "x" : 330, "y" : 101.47651006711409, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 26 */ { "x" : -330, "y" : -101.47651006711409, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 27 */ { "x" : -330, "y" : 101.47651006711409, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 28 */ { "x" : -550.8328416912487, "y" : 125, "cMask" : ["all" ], "cGroup" : [ ], "color" : "747F90", "vis" : false }, /* 29 */ { "x" : -495.55240904621434, "y" : 125, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 30 */ { "x" : -495.71012782694197, "y" : -125, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 31 */ { "x" : -550.8328416912487, "y" : -125, "cMask" : ["all" ], "cGroup" : [ ], "color" : "747F90", "vis" : false }, /* 32 */ { "x" : -460, "y" : 1.5, "cMask" : [ ], "cGroup" : [ ], "color" : "a3acc2" }, /* 33 */ { "x" : -460, "y" : -1.5, "cMask" : [ ], "cGroup" : [ ], "color" : "a3acc2" }, /* 34 */ { "x" : 460, "y" : 1.5, "cMask" : [ ], "cGroup" : [ ], "color" : "a3acc2" }, /* 35 */ { "x" : 460, "y" : -1.5, "cMask" : [ ], "cGroup" : [ ], "color" : "a3acc2" }, /* 36 */ { "x" : -557.3849238651601, "y" : -85, "cMask" : [ ], "cGroup" : [ ] }, /* 37 */ { "x" : -555.4153658303009, "y" : 85, "cMask" : [ ], "cGroup" : [ ] }, /* 38 */ { "x" : 554.2034914824088, "y" : 85, "cMask" : [ ], "cGroup" : [ ] }, /* 39 */ { "x" : 556.1757459004957, "y" : 85, "cMask" : [ ], "cGroup" : [ ] }, /* 40 */ { "x" : 558.1480003185825, "y" : 85, "cMask" : [ ], "cGroup" : [ ] }, /* 41 */ { "x" : 554.2034914824088, "y" : -85, "cMask" : [ ], "cGroup" : [ ] }, /* 42 */ { "x" : 556.1757459004957, "y" : -85, "cMask" : [ ], "cGroup" : [ ] }, /* 43 */ { "x" : -551.5, "y" : -240, "cMask" : [ ], "cGroup" : [ ], "color" : "FFFFFF" }, /* 44 */ { "x" : 551.5, "y" : -240, "cMask" : [ ], "cGroup" : [ ], "color" : "FFFFFF" }, /* 45 */ { "x" : 551.5, "y" : 240, "cMask" : [ ], "cGroup" : [ ], "color" : "FFFFFF" }, /* 46 */ { "x" : -551.5, "y" : 240, "cMask" : [ ], "cGroup" : [ ], "color" : "FFFFFF" }, /* 47 */ { "x" : -496.8141592920354, "y" : -126.4, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 48 */ { "x" : -496.8141592920354, "y" : 126.4, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 49 */ { "x" : 496.294964028777, "y" : -126.4, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 50 */ { "x" : 496.294964028777, "y" : 126.4, "cMask" : [ ], "cGroup" : [ ], "color" : "747F90" }, /* 51 */ { "x" : 590.09852189159, "y" : -85.32608695652173, "cMask" : ["red","blue" ], "curve" : 0, "bias" : 0 }, /* 52 */ { "x" : 590.09852189159, "y" : 85.32608695652173, "cMask" : ["red","blue" ], "curve" : 0, "bias" : 0 }, /* 53 */ { "x" : -589.2917640298795, "y" : -85.32608695652173, "cMask" : ["red","blue" ], "curve" : 0, "bias" : 0 }, /* 54 */ { "x" : -589.2917640298795, "y" : 85.32608695652173, "cMask" : ["red","blue" ], "curve" : 0, "bias" : 0 }, /* 55 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["c3" ], "cGroup" : ["c3" ], "color" : "747F90", "bias" : 0, "curve" : 0 }, /* 56 */ { "x" : 0, "y" : 69.9172859698703, "bCoef" : 0.1, "cMask" : ["redKO","blueKO" ], "cGroup" : ["wall" ], "color" : "A8B707", "bias" : 0, "curve" : 0 }, /* 57 */ { "x" : 0, "y" : 400, "cMask" : [ ], "cGroup" : [ ], "color" : "DBF808", "curve" : 0 }, /* 58 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["c3" ], "cGroup" : ["c3" ], "color" : "747F90", "bias" : 0 }, /* 59 */ { "x" : 0, "y" : -70.99551859163374, "bCoef" : 0.1, "cMask" : ["redKO","blueKO" ], "cGroup" : ["wall" ], "color" : "A8B707", "bias" : 0, "curve" : 0 }, /* 60 */ { "x" : 0, "y" : -400, "cMask" : [ ], "cGroup" : [ ], "color" : "ffffff", "curve" : 0 }, /* 61 */ { "x" : 0, "y" : 111.61106698577682, "bCoef" : 0, "cMask" : ["c3" ], "cGroup" : ["c3" ], "trait" : "threeDefLine", "color" : "747F90", "curve" : 0 }, /* 62 */ { "x" : 0, "y" : -111.44587440155155, "cMask" : ["c3" ], "cGroup" : ["c3" ], "color" : "747F90" }, /* 63 */ { "x" : 646.3746095740169, "y" : 284.69496021220164, "cMask" : ["red","blue" ] }, /* 64 */ { "x" : -645.7116843001736, "y" : 284.69496021220164, "cMask" : ["red","blue" ] }, /* 65 */ { "x" : 648.3236316786663, "y" : -284.69496021220164, "cMask" : ["red","blue" ] }, /* 66 */ { "x" : -648.3236316786663, "y" : -284.69496021220164, "cMask" : ["red","blue" ] } ], "segments" : [ { "v0" : 0, "v1" : 1, "color" : "FFFFFF", "cMask" : ["ball" ], "bias" : -10 }, { "v0" : 44, "v1" : 10, "color" : "FFFFFF", "cMask" : ["ball" ], "bias" : -10 }, { "v0" : 11, "v1" : 45, "color" : "FFFFFF", "cMask" : ["ball" ], "bias" : -10 }, { "v0" : 2, "v1" : 3, "color" : "FFFFFF", "cMask" : ["ball" ], "bias" : -10 }, { "v0" : 46, "v1" : 8, "color" : "FFFFFF", "cMask" : ["ball" ], "bias" : -10 }, { "v0" : 5, "v1" : 6, "color" : "747F90", "bCoef" : 0, "cMask" : [ ], "cGroup" : [ ] }, { "v0" : 4, "v1" : 7, "color" : "747F90", "bCoef" : 0, "cMask" : [ ], "cGroup" : [ ] }, { "v0" : 9, "v1" : 43, "color" : "FFFFFF", "cMask" : ["ball" ], "bias" : -10 }, { "v0" : 6, "v1" : 7, "curve" : 180, "vis" : true, "color" : "747F90", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "bias" : 0, "curveF" : 6.123233995736766e-17 }, { "v0" : 7, "v1" : 6, "curve" : 180, "vis" : true, "color" : "747F90", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 17, "v1" : 16, "vis" : true, "color" : "747F90", "bCoef" : 0, "cMask" : [ ], "trait" : "threeDefLine", "bias" : 0 }, { "v0" : 19, "v1" : 18, "vis" : true, "color" : "747F90", "bCoef" : 0, "cMask" : [ ], "trait" : "threeDefLine", "bias" : 0 }, { "v0" : 21, "v1" : 22, "color" : "747F90", "bCoef" : 0, "cMask" : [ ] }, { "v0" : 23, "v1" : 20, "color" : "747F90", "bCoef" : 0, "cMask" : ["wall" ], "cGroup" : ["wall" ] }, { "v0" : 25, "v1" : 24, "curve" : 106.13725243894305, "color" : "747F90", "bCoef" : 0, "cMask" : [ ], "curveF" : 1.0000000000000002 }, { "v0" : 26, "v1" : 27, "curve" : 106.13725243894305, "color" : "747F90", "bCoef" : 0, "cMask" : [ ], "curveF" : 1.0000000000000002 }, { "v0" : 28, "v1" : 29, "color" : "747F90", "bCoef" : 0, "cMask" : [ ] }, { "v0" : 31, "v1" : 30, "color" : "747F90", "bCoef" : 0, "cMask" : [ ] }, { "v0" : 33, "v1" : 32, "curve" : 180, "color" : "a3acc2", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 32, "v1" : 33, "curve" : 180, "color" : "a3acc2", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 35, "v1" : 34, "curve" : 180, "color" : "a3acc2", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 34, "v1" : 35, "curve" : 180, "color" : "a3acc2", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 10, "v1" : 12, "color" : "747F90", "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : -10 }, { "v0" : 13, "v1" : 11, "color" : "747F90", "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : -10 }, { "v0" : 8, "v1" : 15, "color" : "747F90", "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : -10 }, { "v0" : 14, "v1" : 9, "color" : "747F90", "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : -10 }, { "v0" : 9, "v1" : 8, "color" : "5B5B5B", "bCoef" : 0, "cMask" : [ ] }, { "v0" : 10, "v1" : 11, "color" : "5B5B5B", "bCoef" : 0, "cMask" : [ ] }, { "v0" : 47, "v1" : 48, "color" : "747F90", "bCoef" : 0, "cMask" : [ ] }, { "v0" : 50, "v1" : 49, "color" : "747F90", "bCoef" : 0, "cMask" : [ ] }, { "v0" : 51, "v1" : 52, "curve" : 0, "vis" : false, "color" : "151A1E", "cMask" : ["red","blue" ], "bias" : 0 }, { "v0" : 53, "v1" : 54, "curve" : 0, "vis" : false, "color" : "151A1E", "cMask" : ["red","blue" ], "bias" : 0 }, { "v0" : 56, "v1" : 57, "curve" : 0, "vis" : false, "color" : "DBF808", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] }, { "v0" : 59, "v1" : 60, "curve" : 0, "vis" : false, "color" : "DBF808", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "x" : 0 }, { "v0" : 55, "v1" : 61, "curve" : 0, "vis" : true, "color" : "747F90", "bCoef" : 0, "cMask" : ["c3" ], "cGroup" : ["c3" ], "trait" : "threeDefLine", "bias" : 0 }, { "v0" : 58, "v1" : 62, "vis" : true, "color" : "747F90", "cMask" : ["c3" ], "cGroup" : ["c3" ], "bias" : 0 }, { "v0" : 14, "v1" : 15, "color" : "747F90", "bCoef" : 10, "cMask" : ["c2","ball" ], "cGroup" : ["wall" ], "bias" : 9 }, { "v0" : 12, "v1" : 13, "color" : "747F90", "bCoef" : 10, "cMask" : ["c2","ball" ], "cGroup" : ["wall" ], "bias" : -9 }, { "v0" : 63, "v1" : 64, "curve" : 0, "vis" : false, "color" : "151A1E", "cMask" : ["red","blue" ], "bias" : 0 }, { "v0" : 65, "v1" : 66, "curve" : 0, "vis" : false, "color" : "151A1E", "cMask" : ["red","blue" ], "bias" : 0 } ], "planes" : [ { "normal" : [1,0 ], "dist" : -619.9106456572113, "bCoef" : 0 }, { "normal" : [-1,0 ], "dist" : -619.744420356372, "bCoef" : 0 }, { "normal" : [-1,0 ], "dist" : -330, "bCoef" : 0, "cMask" : ["c1" ] }, { "normal" : [1,0 ], "dist" : -330, "bCoef" : 0, "cMask" : ["c0" ] } ], "goals" : [ { "p0" : [-556.9910122581882,83 ], "p1" : [-556.9910122581882,-87 ], "team" : "red" }, { "p0" : [557.7535494349653,88 ], "p1" : [557.7535494349653,-82 ], "team" : "blue" } ], "discs" : [ { "radius" : 5.8, "invMass" : 1.5, "pos" : [0,0 ], "color" : "FFDFCF", "bCoef" : 0.412, "cGroup" : ["ball","kick","score","c2" ] }, { "radius" : 4.793007919730363, "invMass" : 0, "pos" : [-551.7695023524202,85.18919314566388 ], "color" : "BDBDBD" }, { "radius" : 4.793007919730363, "invMass" : 0, "pos" : [-551.3694552720821,-84.8976609984082 ], "color" : "BDBDBD" }, { "radius" : 4.796287682423271, "invMass" : 0, "pos" : [551.8100332217596,85.73539584934443 ], "color" : "BDBDBD" }, { "radius" : 4.796287682423271, "invMass" : 0, "pos" : [551.8100332217593,-84.73539584934443 ], "color" : "BDBDBD" }, { "radius" : 4.796287682423271, "invMass" : 0, "pos" : [1000,1000 ], "color" : "BDBDBD" }, { "radius" : 4.796287682423271, "invMass" : 0, "pos" : [1000,-1000 ], "color" : "BDBDBD" }, { "radius" : 4.796287682423271, "invMass" : 0, "pos" : [-1000,1000 ], "color" : "BDBDBD" }, { "radius" : 4.796287682423271, "invMass" : 0, "pos" : [-1000,-1000 ], "color" : "BDBDBD" } ], "playerPhysics" : { "damping" : 0.965, "kickingDamping" : 0.9649, "bCoef" : 0, "acceleration" : 0.11, "kickingAcceleration" : 0.083, "kickStrength" : 4.545, "cGroup" : [ "red", "blue" ] }, "ballPhysics" : "disc0", "spawnDistance" : 350, "joints" : [ ], "traits" : { "ballArea" : { "vis" : false, "bCoef" : 1, "cMask" : ["ball" ] }, "goalPost" : { "radius" : 8, "invMass" : 0, "bCoef" : 0.5 }, "goalNet" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball" ] }, "kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] }, "threeDefLine" : { "bCoef" : 0, "cGroup" : ["wall" ], "bias" : -300, "vis" : false }, "threeDefLineBall_RedFirst" : { "radius" : 0, "invMass" : 0, "damping" : 0, "cMask" : ["none" ], "cGroup" : ["none" ] }, "threeDefLineBall_RedSecond" : { "radius" : 0, "invMass" : 0, "damping" : 0, "cMask" : ["none" ], "cGroup" : ["none" ] }, "threeDefLineBall_BlueFirst" : { "radius" : 0, "invMass" : 0, "damping" : 0, "cMask" : ["none" ], "cGroup" : ["none" ] }, "threeDefLineBall_BlueSecond" : { "radius" : 0, "invMass" : 0, "damping" : 0, "cMask" : ["none" ], "cGroup" : ["none" ] } }, "canBeStored" : false, "redSpawnPoints" : [ ], "blueSpawnPoints" : [ ] }`;
    var currentMap = "Solo by Avra";
    var aloneMapWidth = 175,
      aloneMapHeight = 101,
      smallMapWidth = 368,
      smallMapHeight = 170,
      bigMapWidth = 551,
      bigMapHeight = 240;
    /* OPTIONS */
    var afkLimit = 12;
    var drawTimeLimit = Infinity;
    var maxTeamSize = 3; // This works for 1 (you might want to adapt things to remove some useless stats in 1v1 like assist or cs), 2, 3 or 4
    var slowMode = 1;

    // var slowModeTime = 1; //slow chat mode time (seconds)
    // var SlowMode = [];

    /* PLAYERS */

    const Team = { SPECTATORS: 0, RED: 1, BLUE: 2 };
    var extendedP = [];
    const eP = { ID: 0, AUTH: 1, CONN: 2, AFK: 3, ACT: 4, GK: 5, MUTE: 6 };
    const Ss = {
      GA: 0,
      WI: 1,
      DR: 2,
      LS: 3,
      WR: 4,
      GL: 5,
      AS: 6,
      GK: 7,
      CS: 8,
      CP: 9,
      RL: 10,
      NK: 11,
      OG: 12,
      CL: 13,
    };
    var playersALL;
    var players;
    var teamR;
    var teamB;
    var teamS;

    /* GAME */

    var lastTeamTouched;
    var lastPlayersTouched; // These allow to get good goal notifications (it should be lastPlayersKicked, waiting on a next update to get better track of shots on target)
    var countAFK = false; // Created to get better track of activity
    var activePlay = false; // Created to get better track of the possession
    var goldenGoal = false;
    var SMSet = new Set(); // Set created to get slow mode which is useful in chooseMode
    var banList = []; // Getting track of the bans, so we can unban ppl if we want

    /* STATS */

    var game;
    var GKList = ["", ""];
    var Rposs = 0;
    var Bposs = 0;
    var point = [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ]; // created to get ball speed
    var ballSpeed;
    // var vcgbsdbf = 7865;
    var lastWinner = Team.SPECTATORS;
    var streak = 0;
    var allBlues = []; // This is to count the players who should be counted for the stats. This includes players who left after the game has started, doesn't include those who came too late or ...
    var allReds = []; // ... those who came in a very unequal game.

    /* BALANCE & CHOOSE */

    var inChooseMode = false; // This variable enables to distinguish the 2 phases of playing and choosing which should be dealt with very differently
    var redCaptainChoice = "";
    var blueCaptainChoice = "";
    var chooseTime = 20;
    var timeOutCap;

    /* AUXILIARY */

    var checkTimeVariable = false; // This is created so the chat doesn't get spammed when a game is ending via timeLimit
    // let statNumber = 0; // This allows the room to be given stat information every X minutes
    var endGameVariable = true; // This variable with the one below helps distinguish the cases where games are stopped because they have finished to the ones where games are stopped due to player movements or resetting teams
    var resettingTeams = false;
    var capLeft = false;
    // let statInterval = 6;

    loadMap(aloneMap, 0, 0);

    /* OBJECTS */

    function Goal(time, team, striker, assist) {
      this.time = time;
      this.team = team;
      this.striker = striker;
      this.assist = assist;
    }

    function Game(date, scores, goals) {
      this.date = date;
      this.scores = scores;
      this.goals = goals;
    }

    var frasesGOL = [
      "{player1} HOLY S**T WHAT A GOOOOOAL!",
      "DAMN! {player1} WHAT AN ABSOLUTE BANGER!",
      "F***ING HELL {player1} THAT'S INSANE!",
      "LOOK AT THIS CRAZY B*****D {player1} HE'S DONE IT AGAIN!",
      "GOAL! WHAT A F***ING DREAM STRIKE FROM {player1}",
      "ANY B*****D WHO BET ON {player1} GO GET YOUR MONEY!",
      "{player1} SCORES BUT NO DAMN ASSIST THIS TIME!",
      "{player1} YOU BLOODY LEGEND, GO REST NOW!",
      "WHO THE HELL NEEDS MBAPPE WHEN WE HAVE {player1}!",
    ];

    var frasesASS = [
      ", AND {player2} WITH THE DAMN SETUP!",
      ", WHAT A F***ING PASS FROM {player2}!",
      ", HOLY S**T WHAT AN ASSIST FROM {player2}!",
      ", {player2} SERVES IT UP LIKE A BLOODY CHEF!",
      ", DAMN {player2} THAT'S PURE CLASS!",
      ", {player2} SHUT THE CRITICS UP WITH THAT ONE!",
    ];

    var golcontra = [
      "OH FOR F***'S SAKE {player1} WHAT THE HELL!",
      "BLOODY HELL! THE OTHER TEAM THANKS {player1}!",
      "OH S**T S**T S**T {player1} WHAT HAVE YOU DONE!",
      "WHAT A BLOODY DISASTER FROM {player1}!",
      "WHAT A F***ING MESS {player1}!",
      "{player1} YOU ABSOLUTE MUPPET, WRONG WAY!",
      "NOBODY GAVE THAT TO HIM, {player1} F***ED UP ALL BY HIMSELF!",
      "{player1} F***ED IT RIGHT UP THERE!",
    ];
    function updatePhrases(player1, player2 = "") {
      // Replace {player1} globally with player1
      frasesGOL = frasesGOL.map((phrase) =>
        phrase.replace(/{player1}/g, player1)
      );

      // If player2 exists, replace {player2} globally with player2
      if (player2) {
        frasesASS = frasesASS.map((phrase) =>
          phrase.replace(/{player2}/g, player2)
        );
      }

      // Replace {player1} in golcontra with player1 globally
      golcontra = golcontra.map((phrase) =>
        phrase.replace(/{player1}/g, player1)
      );
    }

    function resetPhrases(_player1, _player2 = "") {
      frasesGOL = [
        "{player1} HOLY S**T WHAT A GOOOOOAL!",
        "DAMN! {player1} WHAT AN ABSOLUTE BANGER!",
        "F***ING HELL {player1} THAT'S INSANE!",
        "LOOK AT THIS CRAZY B*****D {player1} HE'S DONE IT AGAIN!",
        "GOAL! WHAT A F***ING DREAM STRIKE FROM {player1}",
        "ANY B*****D WHO BET ON {player1} GO GET YOUR MONEY!",
        "{player1} SCORES BUT NO DAMN ASSIST THIS TIME!",
        "{player1} YOU BLOODY LEGEND, GO REST NOW!",
        "WHO THE HELL NEEDS MBAPPE WHEN WE HAVE {player1}!",
      ];

      frasesASS = [
        ", AND {player2} WITH THE DAMN SETUP!",
        ", WHAT A F***ING PASS FROM {player2}!",
        ", HOLY S**T WHAT AN ASSIST FROM {player2}!",
        ", {player2} SERVES IT UP LIKE A BLOODY CHEF!",
        ", DAMN {player2} THAT'S PURE CLASS!",
        ", {player2} SHUT THE CRITICS UP WITH THAT ONE!",
      ];

      golcontra = [
        "OH FOR F***'S SAKE {player1} WHAT THE HELL!",
        "BLOODY HELL! THE OTHER TEAM THANKS {player1}!",
        "OH S**T S**T S**T {player1} WHAT HAVE YOU DONE!",
        "WHAT A BLOODY DISASTER FROM {player1}!",
        "WHAT A F***ING MESS {player1}!",
        "{player1} YOU ABSOLUTE MUPPET, WRONG WAY!",
        "NOBODY GAVE THAT TO HIM, {player1} F***ED UP ALL BY HIMSELF!",
        "{player1} F***ED IT RIGHT UP THERE!",
      ];
    }

    const goleiro = [
      " it's a man? no, it's a barrier! ",
      " don't let one pass ",
      " is the best GK in the world? ",
    ]; // Goalkeeper phrases

    function getDate() {
      let data = new Date(),
        dia = data.getDate().toString().padStart(2, "0"),
        // mes = (data.getMonth() + 1).toString().padStart(2, "0"),
        // ano = data.getFullYear(),
        // horas = data.getHours().toString().padStart(2, "0"),
        minutos = data.getMinutes().toString().padStart(2, "0");
      segundos = data.getSeconds().toString().padStart(2, "0");
      return `${dia}${minutos}${segundos}`;
    }

    async function discord_errors(log) {
      const payload = {
        username: "League BOT",
        content: "```" + log + "```",
      };

      try {
        const response = await fetch(discord_errors_webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error("Failed to send to Discord:", response.status);
        }
      } catch (error) {
        console.error("Error sending to Discord:", error);
      }
    }

    function attachErrorListeners() {
      process.on("uncaughtException", (err) => {
        discord_errors(`Uncaught Exception: ${err.stack || err}`);
      });

      process.on("unhandledRejection", (reason, promise) => {
        discord_errors(`Unhandled Rejection at: ${promise}\nReason: ${reason}`);
      });
    }

    attachErrorListeners();

    async function code_change(user, code) {
      let payload = {
        avatar_url: "",
        username: "League BOT",
        content: "```" + `${user} changed code to: ${code}` + "```",
      };

      try {
        const response = await fetch(code_chnage_webhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // console.log("Message sent successfully.");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }

    async function log_cmd_used(user, auth, cmd, to) {
      let payload = {
        avatar_url:
          "https://cdn.discordapp.com/icons/1060893277525643304/43e8a52fc7a6788bcbd5b3e9d1ebd1e2.webp?size=96",
        username: "HFL BOT",
        content:
          "```" +
          `${user.name} used command: ${auth} to: ${to},\n[📢]Auth: ${cmd}` +
          "```",
      };

      try {
        const response = await fetch(log_cmd_used_webhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // console.log("Message sent successfully.");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
    async function discord_chat_log(announcement, player, originalMessage) {
      let payload = {
        avatar_url:
          "https://cdn.discordapp.com/icons/1060893277525643304/43e8a52fc7a6788bcbd5b3e9d1ebd1e2.webp?size=96",
        username: "HFL BOT",
        content: `**${announcement} ${player.name}:** ${originalMessage}\n`,
      };

      try {
        const response = await fetch(discord_chat_log_webhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // console.log('Message sent successfully.');
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }

    /* FUNCTIONS */

    /* AUXILIARY FUNCTIONS */

    async function sendAnnouncementToDiscord(message) {
      let payload = {
        avatar_url: "",
        username: "HFL BOT",
        content: message,
      };

      try {
        const response = await fetch(sendAnnouncementToDiscord_webhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // console.log('Message sent successfully.');
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }

    function getPlayerRank(player) {
      if (getAuth(player) != null) {
        if (localStorage.getItem(getAuth(player))) {
          let stats;
          localStorage.getItem(getAuth(player))
            ? (stats = JSON.parse(localStorage.getItem(getAuth(player))))
            : (stats = [
                0,
                0,
                0,
                0,
                "0.00",
                0,
                0,
                0,
                0,
                "0.00",
                "player",
                player.name,
                0,
                "none",
              ]);
          let stato =
            stats[Ss.WI] * 3 +
            stats[Ss.DR] +
            stats[Ss.GL] * 2 +
            stats[Ss.AS] +
            stats[Ss.CS] -
            stats[Ss.LS] * 2 -
            stats[Ss.OG];
          if (stato > 10000) return "「Primordial x3」";
          else if (stato > 9976) return "「Stardust IV」";
          else if (stato > 9789) return "「Stardust III」";
          else if (stato > 9602) return "「Stardust II」";
          else if (stato > 9415) return "「Stardust I」";
          else if (stato > 9228) return "「Ascendant IV」";
          else if (stato > 9041) return "「Ascendant III」";
          else if (stato > 8854) return "「Ascendant II」";
          else if (stato > 8667) return "「Ascendant I」";
          else if (stato > 8480) return "「Divine V」";
          else if (stato > 8293) return "「Divine IV」";
          else if (stato > 8106) return "「Divine III」";
          else if (stato > 7919) return "「Divine II」";
          else if (stato > 7732) return "「Divine I」";
          else if (stato > 7545) return "「Ethereal IV」";
          else if (stato > 7358) return "「Ethereal III」";
          else if (stato > 7171) return "「Ethereal II」";
          else if (stato > 6984) return "「Ethereal I」";
          else if (stato > 6797) return "「Voidstone IV」";
          else if (stato > 6610) return "「Voidstone III」";
          else if (stato > 6423) return "「Voidstone II」";
          else if (stato > 6236) return "「Voidstone I」";
          else if (stato > 6049) return "「Celestial IV」";
          else if (stato > 5862) return "「Celestial III」";
          else if (stato > 5675) return "「Celestial II」";
          else if (stato > 5488) return "「Celestial I」";
          else if (stato > 5301) return "「Mythic IV」";
          else if (stato > 5114) return "「Mythic III」";
          else if (stato > 4927) return "「Mythic II」";
          else if (stato > 4740) return "「Mythic I」";
          else if (stato > 4553) return "「Titanium IV」";
          else if (stato > 4366) return "「Titanium III」";
          else if (stato > 4179) return "「Titanium II」";
          else if (stato > 3992) return "「Titanium I」";
          else if (stato > 3805) return "「Crystal IV」";
          else if (stato > 3618) return "「Crystal III」";
          else if (stato > 3431) return "「Crystal II」";
          else if (stato > 3244) return "「Crystal I」";
          else if (stato > 3057) return "「Mythril IV」";
          else if (stato > 2870) return "「Mythril III」";
          else if (stato > 2683) return "「Mythril II」";
          else if (stato > 2496) return "「Mythril I」";
          else if (stato > 2309) return "「Obsidian IV」";
          else if (stato > 2122) return "「Obsidian III」";
          else if (stato > 1935) return "「Obsidian II」";
          else if (stato > 1748) return "「Obsidian I」";
          else if (stato > 1561) return "「The Legend IV」";
          else if (stato > 1374) return "「The Legend III」";
          else if (stato > 1187) return "「The Legend II」";
          else if (stato > 1000) return "「The Legend I」";
          else if (stato > 850) return "「Diamond IV」";
          else if (stato > 700) return "「Diamond III」";
          else if (stato > 560) return "「Diamond II」";
          else if (stato > 460) return "「Diamond I」";
          else if (stato > 380) return "「Platinum III」";
          else if (stato > 320) return "「Platinum II」";
          else if (stato > 260) return "「Platinum I」";
          else if (stato > 200) return "「Gold III」";
          else if (stato > 160) return "「Gold II」";
          else if (stato > 130) return "「Gold I」";
          else if (stato > 90) return "「Silver III」";
          else if (stato > 70) return "「Silver II」";
          else if (stato > 50) return "「Silver I」";
          else if (stato > 30) return "「Bronze III」";
          else if (stato > 20) return "「Bronze II」";
          else if (stato > 10) return "「Bronze I」";
          else return "「No rank」";
        } else {
          stats = [
            0,
            0,
            0,
            0,
            "0.00",
            0,
            0,
            0,
            0,
            "0.00",
            "player",
            player.name,
            0,
            "none",
          ];
          localStorage.setItem(getAuth(player), JSON.stringify(stats));
        }
      } else {
        return "「No rank」";
      }
    }

    function discord_scores_log(
      game,
      scores,
      winner,
      Rposs,
      Bposs,
      GK1,
      GK2,
      report
    ) {
      var currentDate = new Date();
      var currentHour = currentDate.getHours();
      var currentMinute = currentDate.getMinutes();
      var currentSecond = currentDate.getSeconds();
      currentHour = (currentHour < 10 ? "0" : "") + currentHour;
      currentMinute = (currentMinute < 10 ? "0" : "") + currentMinute;
      currentSecond = (currentSecond < 10 ? "0" : "") + currentSecond;
      var currentDateFormatted = currentDate.toISOString().slice(0, 10);

      var form = new FormData();

      var fields = [
        {
          name: "🔴   **RED TEAM STATS**",
          value: "=====================\n",
          inline: true,
        },
        {
          name: "🔵   **BLUE TEAM STATS**",
          value: "=====================\n",
          inline: true,
        },
      ];

      for (let i = 0; i < game.goals.length; i++) {
        let playerauth = getAuth(game.goals[i].striker);
        if (game.goals[i].assist === "own") {
          fields[game.goals[i].team == 1 ? 1 : 0].value +=
            "```" +
            `${getTime(game.goals[i])} 🤡 Owngoal: \n${getPlayerRank(
              playerauth
            )} ${game.goals[i].striker.name}` +
            "```\n";
        } else if (game.goals[i].assist !== null) {
          fields[game.goals[i].team == 1 ? 0 : 1].value +=
            "```" +
            `${getTime(game.goals[i])} ⚽ Goal: \n${getPlayerRank(
              playerauth
            )} ${game.goals[i].striker.name}, 👟 Assist: ${
              game.goals[i].assist.name
            }` +
            "```\n";
        } else {
          fields[game.goals[i].team == 1 ? 0 : 1].value +=
            "```" +
            `${getTime(game.goals[i])} ⚽ Goal: \n${getPlayerRank(
              playerauth
            )} ${game.goals[i].striker.name}` +
            "```\n";
        }
      }
      let gkier = ["", ""];
      scores.red == 0
        ? scores.blue == 0
          ? (gkier = [GK1, GK2])
          : (gkier[1] = GK2)
        : scores.blue == 0
        ? (gkier[0] = GK1)
        : null;

      gkier[0] === ""
        ? null
        : (fields[0].value += "```🥅 Clean Sheet: " + gkier[0] + "```");
      gkier[1] === ""
        ? null
        : (fields[1].value += "```🥅 Clean Sheet: " + gkier[1] + "```");

      var params = {
        avatar_url:
          "https://cdn.discordapp.com/icons/1060893277525643304/43e8a52fc7a6788bcbd5b3e9d1ebd1e2.webp?size=96",
        username: "HHL BOT",
        embeds: [
          {
            title: `📝 MATCH REPORT: **${report}**`,
            description:
              `**${getTime(game.scores)}** ` +
              (winner == 1 ? "🏆 **Red Team** " : "Red Team ") +
              (winner == 1 ? `**${scores.red}**` : `${scores.red}`) +
              " - " +
              (winner == 2 ? `**${scores.blue}**` : `${scores.blue}`) +
              (winner == 2 ? " **Blue Team** 🏆" : " Blue Team") +
              "\n```c\nPossession: " +
              Math.floor(Rposs * 100) +
              "% - " +
              Math.floor(Bposs * 100) +
              "%```",
            color: 0x000000,
            fields: fields,
            footer: {
              text: `Recording: ${currentDateFormatted}_${currentHour}:${currentMinute}:${currentSecond}`,
            },
          },
        ],
      };

      form.append("payload_json", JSON.stringify(params));
      const safeFileName = `HBReplay-${currentDateFormatted}_${currentHour}-${currentMinute}-${currentSecond}.hbr2`;
      const replayDirectory = path.resolve("./replays");
      const replayFileName = path.join(replayDirectory, safeFileName);

      if (!fs.existsSync(replayDirectory)) {
        console.error("Replay directory does not exist!");
        return;
      }

      try {
        fs.accessSync(replayDirectory, fs.constants.W_OK);
        // console.log('Write permissions verified for:', replayDirectory);
      } catch (err) {
        console.error(
          "No write permissions for:",
          replayDirectory,
          err.message
        );
        return;
      }

      let fileContent;
      try {
        fileContent = room.stopRecording();
        if (!fileContent || fileContent.length === 0) {
          throw new Error("No content returned from stopRecording");
        }
        // console.log('Recording content length:', fileContent.length);
      } catch (err) {
        console.error("Error stopping recording:", err.message);
        return;
      }

      try {
        const normalizedPath = path.normalize(replayFileName);
        // console.log('Normalized replay file path:', normalizedPath);
        fs.writeFileSync(normalizedPath, fileContent);
        form.append("file", fs.createReadStream(normalizedPath));
        // console.log(`Replay file saved successfully: ${normalizedPath}`);
      } catch (err) {
        console.error("Error writing replay file:", err.message);
      }

      fetch(discord_scores_log_webhook, {
        method: "POST",
        body: form,
      })
        .then((response) => {
          if (response.ok) {
            // console.log('Scores sent successfully');
          } else {
            console.error("Failed to send webhook");
          }
        })
        .catch((error) => {
          console.error("Error sending webhook:", error);
        });
    }

    function getRandomInt(max) {
      // returns a random number from 0 to max-1
      return Math.floor(Math.random() * Math.floor(max));
    }

    function getTime(scores) {
      // returns the current time of the game
      return (
        "[" +
        Math.floor(Math.floor(scores.time / 60) / 10).toString() +
        Math.floor(Math.floor(scores.time / 60) % 10).toString() +
        ":" +
        Math.floor(
          Math.floor(scores.time - Math.floor(scores.time / 60) * 60) / 10
        ).toString() +
        Math.floor(
          Math.floor(scores.time - Math.floor(scores.time / 60) * 60) % 10
        ).toString() +
        "]"
      );
    }

    function pointDistance(p1, p2) {
      var d1 = p1.x - p2.x;
      var d2 = p1.y - p2.y;
      return Math.sqrt(d1 * d1 + d2 * d2);
    }

    /* BUTTONS */

    function topBtn() {
      if (teamS.length == 0) {
        return;
      } else {
        if (teamR.length == teamB.length) {
          if (teamS.length > 1) {
            room.setPlayerTeam(teamS[0].id, Team.RED);
            room.setPlayerTeam(teamS[1].id, Team.BLUE);
          }
          return;
        } else if (teamR.length < teamB.length) {
          room.setPlayerTeam(teamS[0].id, Team.RED);
        } else {
          room.setPlayerTeam(teamS[0].id, Team.BLUE);
        }
      }
    }

    function randomBtn() {
      if (teamS.length == 0) {
        return;
      } else {
        if (teamR.length == teamB.length) {
          if (teamS.length > 1) {
            var r = getRandomInt(teamS.length);
            room.setPlayerTeam(teamS[r].id, Team.RED);
            teamS = teamS.filter((spec) => spec.id != teamS[r].id);
            room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE);
          }
          return;
        } else if (teamR.length < teamB.length) {
          room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.RED);
        } else {
          room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE);
        }
      }
    }

    function blueToSpecBtn() {
      resettingTeams = true;
      setTimeout(() => {
        resettingTeams = false;
      }, 100);
      for (var i = 0; i < teamB.length; i++) {
        room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
      }
    }

    function redToSpecBtn() {
      resettingTeams = true;
      setTimeout(() => {
        resettingTeams = false;
      }, 100);
      for (var i = 0; i < teamR.length; i++) {
        room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
      }
    }

    function resetBtn() {
      resettingTeams = true;
      setTimeout(() => {
        resettingTeams = false;
      }, 100);
      if (teamR.length <= teamB.length) {
        for (var i = 0; i < teamR.length; i++) {
          room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
          room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
        }
        for (var i = teamR.length; i < teamB.length; i++) {
          room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
        }
      } else {
        for (var i = 0; i < teamB.length; i++) {
          room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
          room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
        }
        for (var i = teamB.length; i < teamR.length; i++) {
          room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
        }
      }
    }

    function blueToRedBtn() {
      resettingTeams = true;
      setTimeout(() => {
        resettingTeams = false;
      }, 100);
      for (var i = 0; i < teamB.length; i++) {
        room.setPlayerTeam(teamB[i].id, Team.RED);
      }
    }

    /* GAME FUNCTIONS */

    function checkTime() {
      const scores = room.getScores();
      game.scores = scores;
      if (
        Math.abs(scores.time - scores.timeLimit) <= 0.01 &&
        scores.timeLimit != 0
      ) {
        if (scores.red != scores.blue) {
          if (checkTimeVariable == false) {
            checkTimeVariable = true;
            setTimeout(() => {
              checkTimeVariable = false;
            }, 3000);
            scores.red > scores.blue
              ? endGame(Team.RED, "Win")
              : endGame(Team.BLUE, "Win");
            setTimeout(() => {
              room.stopGame();
            }, 2000);
          }
          return;
        }
        goldenGoal = true;
        room.sendChat("⏱️ Let's go, you wooden legs! The guys want to play");
      }
      if (
        Math.abs(drawTimeLimit * 60 - scores.time - 60) <= 0.01 &&
        players.length > 2
      ) {
        if (checkTimeVariable == false) {
          checkTimeVariable = true;
          setTimeout(() => {
            checkTimeVariable = false;
          }, 10);
          room.sendChat("⌛ Leaving ends..");
        }
      }
      if (
        Math.abs(scores.time - drawTimeLimit * 60) <= 0.01 &&
        players.length > 2
      ) {
        if (checkTimeVariable == false) {
          checkTimeVariable = true;
          setTimeout(() => {
            checkTimeVariable = false;
          }, 10);
          endGame(Team.SPECTATORS, "Draw");
          room.stopGame();
          goldenGoal = false;
        }
      }
    }
    //   function givebets(winner) {
    //     let ident = { auth: 0, team: 1, chip: 2, quant: 3, name: 4, id: 5 };
    //     gamebets.forEach((bet) => {
    //       if (
    //         bet[ident.team] == winner &&
    //         (!getId(bet[ident.auth]) ||
    //           (getId(bet[ident.auth]) &&
    //             room.getPlayer(getId(bet[ident.auth])) &&
    //             (room.getPlayer(getId(bet[ident.auth])).team == winner ||
    //               room.getPlayer(getId(bet[ident.auth])).team == Team.SPECTATORS)))
    //       ) {
    //         let stats;
    //         localStorage.getItem(bet[ident.auth])
    //           ? (stats = JSON.parse(localStorage.getItem(bet[ident.auth])))
    //           : (stats = [
    //               0,
    //               0,
    //               0,
    //               0,
    //               "0.00",
    //               0,
    //               0,
    //               0,
    //               0,
    //               "0.00",
    //               "player",
    //               bet[ident.name],
    //               0,
    //               "none",
    //             ]);
    //         let selectedStat =
    //           bet[ident.chip] === "w"
    //             ? 1
    //             : bet[ident.chip] === "g"
    //             ? 5
    //             : bet[ident.chip] === "as"
    //             ? 6
    //             : bet[ident.chip] === "gk"
    //             ? 7
    //             : 8;
    //         if (redodds <= 0) redodds = -0.01;
    //         if (blueodds <= 0) blueodds = -0.01;
    //         let multi =
    //           bet[ident.team] === Team.RED
    //             ? Math.floor(100 / (redodds * 100))
    //             : Math.floor(100 / (blueodds * 100));
    //         let addin = Math.floor(
    //           (Number(bet[ident.quant]) * multi * betTax) / 100
    //         );
    //         if (addin <= 0) addin = Math.floor(-addin * 1.1);
    //         stats[selectedStat] += addin + bet[ident.quant];
    //         localStorage.setItem(bet[ident.auth], JSON.stringify(stats));
    //         room.sendAnnouncement(
    //           `Player ${bet[ident.name]} won bet for Team ${
    //             bet[ident.team]
    //           }, he got: ${addin} of ${bet[ident.chip]}`,
    //           null,
    //           0x73ec59,
    //           "small-bold"
    //         );
    //       } else if (
    //         bet[ident.team] == winner &&
    //         getId(bet[ident.auth]) &&
    //         room.getPlayer(getId(bet[ident.auth])) &&
    //         (room.getPlayer(getId(bet[ident.auth])).team != winner ||
    //           room.getPlayer(getId(bet[ident.auth])).team != Team.SPECTATORS)
    //       ) {
    //         let stats;
    //         localStorage.getItem(bet[ident.auth])
    //           ? (stats = JSON.parse(localStorage.getItem(bet[ident.auth])))
    //           : (stats = [
    //               0,
    //               0,
    //               0,
    //               0,
    //               "0.00",
    //               0,
    //               0,
    //               0,
    //               0,
    //               "0.00",
    //               "player",
    //               bet[ident.name],
    //               0,
    //               "none",
    //             ]);
    //         let selectedStat =
    //           bet[ident.chip] === "w"
    //             ? 1
    //             : bet[ident.chip] === "g"
    //             ? 5
    //             : bet[ident.chip] === "as"
    //             ? 6
    //             : bet[ident.chip] === "gk"
    //             ? 7
    //             : 8;
    //         stats[selectedStat] += bet[ident.quant];
    //         stats[selectedStat] -= 2;
    //         localStorage.setItem(bet[ident.auth], JSON.stringify(stats));
    //         room.sendAnnouncement(
    //           `As penalty for betting on opposite team, we returned your ${
    //             bet[ident.quant]
    //           } and took 2 ${bet[ident.chip]}`,
    //           getId(bet[ident.auth]),
    //           0xe04848,
    //           "small-bold"
    //         );
    //       } else {
    //         room.sendAnnouncement(
    //           `You Lost the bet for Team ${bet[ident.team]} with ${
    //             bet[ident.chip]
    //           }: ${bet[ident.quant]}`,
    //           getId(bet[ident.auth]),
    //           0xe04848,
    //           "small-bold"
    //         );
    //       }
    //     });
    //   }
    function endGame(winner, report) {
      // handles the end of a game : no stopGame function inside
      players.length >= 2 * maxTeamSize - 1 ? activateChooseMode() : null;
      const scores = room.getScores();
      game.scores = scores;
      Rposs = Rposs / (Rposs + Bposs);
      Bposs = 1 - Rposs;
      lastWinner = winner;
      endGameVariable = true;
      if (winner == Team.RED) {
        streak++;
        room.sendAnnouncement(
          "🏆 Red team won! [" +
            scores.red +
            " - " +
            scores.blue +
            "] | Winning streak: " +
            streak +
            " 🏆",
          null,
          0xfdc43a
        );
      } else if (winner == Team.BLUE) {
        streak = 1;
        room.sendAnnouncement(
          "🏆 Blue team won! [" +
            scores.blue +
            " - " +
            scores.red +
            "] | Winning streak: " +
            streak +
            " 🏆",
          null,
          0xfdc43a
        );
      } else {
        streak = 0;
        room.sendAnnouncement("💤 Timeout reached");
      }
      room.sendAnnouncement(
        "📊 Ball possession: 🔴 " +
          (Rposs * 100).toPrecision(3).toString() +
          "% | " +
          (Bposs * 100).toPrecision(3).toString() +
          "% 🔵",
        null,
        0xfdc43a
      );
      scores.red == 0
        ? scores.blue == 0
          ? room.sendAnnouncement(
              "🥅 " +
                GKList[0].name +
                " it's a man? no, it's a barrier! " +
                GKList[1].name +
                " did not score. ",
              null,
              0xfdc43a
            )
          : room.sendAnnouncement(
              "🥅 it's a man? no, it's a barrier! " +
                GKList[1].name +
                " didn't concede a goal ",
              null,
              0xfdc43a
            )
        : scores.blue == 0
        ? room.sendAnnouncement(
            "🥅 it's a man? no, it's a barrier! " +
              GKList[0].name +
              " didn't concede a goal ",
            null,
            0xfdc43a
          )
        : null;
      updateStats();
      discord_scores_log(
        game,
        scores,
        winner,
        Rposs,
        Bposs,
        GKList[0].name,
        GKList[1].name,
        report
      );
      // givebets(winner);
      redodds = 0;
      blueodds = 0;
      gamebets = [];
      room.sendAnnouncement(
        "The match was recorded and sent on our Discord. ID: " + `${getDate()}`,
        null,
        Cor.Amarelo,
        Negrito
      );
    }

    function quickRestart() {
      room.stopGame();
      setTimeout(() => {
        room.startGame();
      }, 2000);
    }

    function resumeGame() {
      setTimeout(() => {
        room.startGame();
      }, 2000);
      setTimeout(() => {
        room.pauseGame(false);
      }, 1000);
    }

    function activateChooseMode() {
      inChooseMode = true;
      slowMode = 2;
      room.sendChat("🙋‍♂️ Recruitment mode started!");
    }

    function deactivateChooseMode() {
      inChooseMode = false;
      clearTimeout(timeOutCap);
      if (slowMode != 0) {
        slowMode = 0;
        room.sendChat("🙋‍♂️ Recruitment mode has ended.");
      }
      redCaptainChoice = "";
      blueCaptainChoice = "";
    }

    function loadMap(map, scoreLim, timeLim) {
      if (map == aloneMap) {
        room.setCustomStadium(aloneMap);
      } else if (map == classicMap) {
        classicMap != ""
          ? room.setCustomStadium(classicMap)
          : room.setDefaultStadium("Classic");
      } else if (map == bigMap) {
        bigMap != "."
          ? room.setCustomStadium(bigMap)
          : room.setDefaultStadium("Big");
      } else {
        room.setCustomStadium(map);
      }
      room.setScoreLimit(scoreLim);
      room.setTimeLimit(timeLim);
    }

    /* PLAYER FUNCTIONS */

    function clonekick(player) {
      players = room.getPlayerList();
      var i;
      for (i = 0; i < players.length - 1; i++) {
        if (player.name == players[i].name) {
          room.kickPlayer(
            player.id,
            "❌A Player With This Name Already Exists",
            false
          );
        }
      }
    }

    function updateTeams() {
      // update the players' list and all the teams' list
      playersALL = room.getPlayerList();
      players = room
        .getPlayerList()
        .filter((player) => player.id != 0 && !getAFK(player));
      teamR = players.filter((p) => p.team === Team.RED);
      teamB = players.filter((p) => p.team === Team.BLUE);
      teamS = players.filter((p) => p.team === Team.SPECTATORS);
    }

    function handleInactivity() {
      // handles inactivity : players will be kicked after afkLimit
      if (countAFK && teamR.length + teamB.length > 1) {
        for (var i = 0; i < teamR.length; i++) {
          setActivity(teamR[i], getActivity(teamR[i]) + 1);
        }
        for (var i = 0; i < teamB.length; i++) {
          setActivity(teamB[i], getActivity(teamB[i]) + 1);
        }
      }
      for (var i = 0; i < extendedP.length; i++) {
        if (extendedP[i][eP.ACT] == 60 * ((2 / 3) * afkLimit)) {
          room.sendAnnouncement(
            "[PV] ⛔ @" +
              room.getPlayer(extendedP[i][eP.ID]).name +
              ", if you don't move in the next " +
              Math.floor(afkLimit / 3) +
              " seconds, you will be kicked!",
            extendedP[i][eP.ID]
          );
        }
        if (extendedP[i][eP.ACT] >= 60 * afkLimit) {
          extendedP[i][eP.ACT] = 0;
          if (room.getScores().time <= afkLimit - 0.5) {
            setTimeout(() => {
              !inChooseMode ? quickRestart() : room.stopGame();
            }, 10);
          }
          room.kickPlayer(extendedP[i][eP.ID], "AFK", false);
        }
      }
    }

    function getAuth(player) {
      if (!player || player.id == null) return null;

      const filteredArray = extendedP.filter((a) => a[0] == player.id);

      if (filteredArray.length > 0) {
        return filteredArray[0][eP.AUTH];
      } else {
        return null;
      }
    }

    function getId(auth) {
      if (!auth == null) return null;

      const filteredArray = extendedP.filter((a) => a[1] == auth);

      if (filteredArray.length > 0) {
        return filteredArray[0][eP.ID];
      } else {
        return null;
      }
    }

    function getAFK(player) {
      return extendedP.filter((a) => a[0] == player.id) != null
        ? extendedP.filter((a) => a[0] == player.id)[0][eP.AFK]
        : null;
    }

    function setAFK(player, value) {
      extendedP
        .filter((a) => a[0] == player.id)
        .forEach((player) => (player[eP.AFK] = value));
    }

    function getActivity(player) {
      return extendedP.filter((a) => a[0] == player.id) != null
        ? extendedP.filter((a) => a[0] == player.id)[0][eP.ACT]
        : null;
    }

    function setActivity(player, value) {
      extendedP
        .filter((a) => a[0] == player.id)
        .forEach((player) => (player[eP.ACT] = value));
    }

    function getGK(player) {
      return extendedP.filter((a) => a[0] == player.id) != null
        ? extendedP.filter((a) => a[0] == player.id)[0][eP.GK]
        : null;
    }

    function setGK(player, value) {
      extendedP
        .filter((a) => a[0] == player.id)
        .forEach((player) => (player[eP.GK] = value));
    }

    function getMute(player) {
      return extendedP.filter((a) => a[0] == player.id) != null
        ? extendedP.filter((a) => a[0] == player.id)[0][eP.MUTE]
        : null;
    }

    function setMute(player, value) {
      extendedP
        .filter((a) => a[0] == player.id)
        .forEach((player) => (player[eP.MUTE] = value));
    }

    /* BALANCE & CHOOSE FUNCTIONS */

    function updateRoleOnPlayerIn() {
      updateTeams();
      if (inChooseMode) {
        if (players.length == 6) {
          loadMap(bigMap, scoreLimitBig, timeLimitBig);
        }
        if (
          getSpecList(teamR.length <= teamB.length ? teamR[0] : teamB[0]) == -1
        )
          getSpecList(teamR.length <= teamB.length ? teamR[0] : teamB[0]);
      }
      balanceTeams();
    }

    function updateRoleOnPlayerOut() {
      updateTeams();
      if (room.getScores() != null) {
        var scores = room.getScores();
        if (
          players.length >= 2 * maxTeamSize &&
          scores.time >= (5 / 6) * game.scores.timeLimit &&
          teamR.length != teamB.length
        ) {
          if (teamR.length < teamB.length) {
            if (scores.blue - scores.red == 2) {
              endGame(Team.BLUE, "Ragequit");
              room.sendChat("🤖 Ragequit detected. The game is over");
              setTimeout(() => {
                room.stopGame();
              }, 100);
              return;
            }
          } else {
            if (scores.red - scores.blue == 2) {
              endGame(Team.RED, "Ragequit");
              room.sendChat("🤖 Ragequit detected. The game is over");
              setTimeout(() => {
                room.stopGame();
              }, 100);
              return;
            }
          }
        }
      }
      if (inChooseMode) {
        if (players.length == 5) {
          loadMap(classicMap, scoreLimitClassic, timeLimitClassic);
        }
        if (teamR.length == 0 || teamB.length == 0) {
          teamR.length == 0
            ? room.setPlayerTeam(teamS[0].id, Team.RED)
            : room.setPlayerTeam(teamS[0].id, Team.BLUE);
          return;
        }
        if (Math.abs(teamR.length - teamB.length) == teamS.length) {
          room.sendChat("🤖 No choices let me handle this situation");
          deactivateChooseMode();
          resumeGame();
          var b = teamS.length;
          if (teamR.length > teamB.length) {
            for (var i = 0; i < b; i++) {
              setTimeout(() => {
                room.setPlayerTeam(teamS[0].id, Team.BLUE);
              }, 5 * i);
            }
          } else {
            for (var i = 0; i < b; i++) {
              setTimeout(() => {
                room.setPlayerTeam(teamS[0].id, Team.RED);
              }, 5 * i);
            }
          }
          return;
        }
        if (streak == 0 && room.getScores() == null) {
          if (Math.abs(teamR.length - teamB.length) == 2) {
            // if someone left a team has 2 more players than the other one, put the last chosen guy back in his place so it's fair
            room.sendChat("🤖 Balancing teams...");
            teamR.length > teamB.length
              ? room.setPlayerTeam(teamR[teamR.length - 1].id, Team.SPECTATORS)
              : room.setPlayerTeam(teamB[teamB.length - 1].id, Team.SPECTATORS);
          }
        }
        if (teamR.length == teamB.length && teamS.length < 2) {
          deactivateChooseMode();
          resumeGame();
          return;
        }
        capLeft
          ? choosePlayer()
          : getSpecList(teamR.length <= teamB.length ? teamR[0] : teamB[0]);
      }
      balanceTeams();
    }

    function balanceTeams() {
      if (!inChooseMode) {
        if (players.length == 1 && teamR.length == 0) {
          quickRestart();
          loadMap(aloneMap, 0, 0);
          room.setPlayerTeam(players[0].id, Team.RED);
        } else if (
          Math.abs(teamR.length - teamB.length) == teamS.length &&
          teamS.length > 0
        ) {
          const n = Math.abs(teamR.length - teamB.length);
          if (players.length == 2) {
            quickRestart();
            loadMap(classicMap, scoreLimitClassic, timeLimitClassic);
          }
          if (teamR.length > teamB.length) {
            for (var i = 0; i < n; i++) {
              room.setPlayerTeam(teamS[i].id, Team.BLUE);
            }
          } else {
            for (var i = 0; i < n; i++) {
              room.setPlayerTeam(teamS[i].id, Team.RED);
            }
          }
        } else if (Math.abs(teamR.length - teamB.length) > teamS.length) {
          const n = Math.abs(teamR.length - teamB.length);
          if (players.length == 1) {
            quickRestart();
            loadMap(aloneMap, 0, 0);
            room.setPlayerTeam(players[0].id, Team.RED);
            return;
          } else if (players.length == 5) {
            quickRestart();
            loadMap(classicMap, scoreLimitClassic, timeLimitClassic);
          }
          if (players.length == maxTeamSize * 2 - 1) {
            allReds = [];
            allBlues = [];
          }
          if (teamR.length > teamB.length) {
            for (var i = 0; i < n; i++) {
              room.setPlayerTeam(
                teamR[teamR.length - 1 - i].id,
                Team.SPECTATORS
              );
            }
          } else {
            for (var i = 0; i < n; i++) {
              room.setPlayerTeam(
                teamB[teamB.length - 1 - i].id,
                Team.SPECTATORS
              );
            }
          }
        } else if (
          Math.abs(teamR.length - teamB.length) < teamS.length &&
          teamR.length != teamB.length
        ) {
          room.pauseGame(true);
          activateChooseMode();
          choosePlayer();
        } else if (
          teamS.length >= 2 &&
          teamR.length == teamB.length &&
          teamR.length < maxTeamSize
        ) {
          if (teamR.length == 2) {
            quickRestart();
            loadMap(bigMap, scoreLimitBig, timeLimitBig);
          }
          topBtn();
        }
      }
    }

    function choosePlayer() {
      clearTimeout(timeOutCap);
      if (teamR.length <= teamB.length && teamR.length != 0) {
        room.sendChat(
          "[PV] To choose a player, enter his number from the provided list or use'top', 'random' or 'bottom'.",
          teamR[0].id
        );
        timeOutCap = setTimeout(
          function (player) {
            room.sendChat(
              "[PV] Hurry up @" +
                player.name +
                ", you have only " +
                Number.parseInt(chooseTime / 2) +
                " seconds left to choose!",
              player.id
            );
            timeOutCap = setTimeout(
              function (player) {
                room.kickPlayer(player.id, "You didn't choose in time!", false);
              },
              chooseTime * 500,
              teamR[0]
            );
          },
          chooseTime * 1000,
          teamR[0]
        );
      } else if (teamB.length < teamR.length && teamB.length != 0) {
        room.sendChat(
          "[PV] To choose a player, enter his number from the provided list or use'top', 'random' or 'bottom'.",
          teamB[0].id
        );
        timeOutCap = setTimeout(
          function (player) {
            room.sendChat(
              "[PV] Hurry up @" +
                player.name +
                ", you have only " +
                Number.parseInt(chooseTime / 2) +
                " seconds left to choose!",
              player.id
            );
            timeOutCap = setTimeout(
              function (player) {
                room.kickPlayer(player.id, "You didn't choose in time!", false);
              },
              chooseTime * 500,
              teamB[0]
            );
          },
          chooseTime * 1000,
          teamB[0]
        );
      }
      if (teamR.length != 0 && teamB.length != 0)
        getSpecList(teamR.length <= teamB.length ? teamR[0] : teamB[0]);
    }

    function getSpecList(player) {
      if (!player || typeof player.id !== "number") {
        console.error("Invalid player object or missing id.");
        return -1;
      }
      var cstm = "[PV] Players: ";
      for (var i = 0; i < teamS.length; i++) {
        var playerName = teamS[i]?.name || "Unknown";
        var playerEntry = playerName + "[" + (i + 1) + "], ";
        if (140 - cstm.length < playerEntry.length) {
          room.sendChat(cstm, player.id);
          cstm = "... ";
        }
        cstm += playerEntry;
      }
      cstm = cstm.substring(0, cstm.length - 2) + ".";
      room.sendChat(cstm, player.id);
    }

    function checkBallPosition(mapWidth, mapHeight) {
      const ballPosition = room.getBallPosition();
      const halfWidth = mapWidth;
      const halfHeight = mapHeight;
      if (
        ballPosition.x < -halfWidth ||
        ballPosition.x > halfWidth ||
        ballPosition.y < -halfHeight ||
        ballPosition.y > halfHeight
      ) {
        let newX = ballPosition.x;
        let newY = ballPosition.y;
        if (newX < -halfWidth) newX = -halfWidth;
        if (newX > halfWidth) newX = halfWidth;
        if (newY < -halfHeight) newY = -halfHeight;
        if (newY > halfHeight) newY = halfHeight;
        room.setDiscProperties(0, { x: newX, y: newY });
      }
    }

    var playertofollowid = -1;
    var playertogayid = -1;
    var definvMass = 1;
    let pressStart = {};
    let cooldown = {};
    let secondoPast = {};
    let supers = {};
    let knifepower = false;
    /* STATS FUNCTIONS */

    //   function powershotactive() {
    //     room.getPlayerList().forEach((p) => {
    //       if (!p || !p.id) return;
    //       const props = room.getPlayerDiscProperties(p.id);
    //       if (!props) return;

    //       if (!cooldown[p.id]) cooldown[p.id] = 0;
    //       if (props.damping === 0.9649) {
    //         pressStart[p.id] = pressStart[p.id] || Date.now();
    //         secondoPast[p.id] = secondoPast[p.id] || Date.now();

    //         if (Date.now() - pressStart[p.id] >= 600) {
    //           if (cooldown[p.id] > 0) {
    //             if (Date.now() - secondoPast[p.id] >= 1000 && supers[p.id]) {
    //               room.sendAnnouncement(
    //                 `PowerUp Cooldown!`,
    //                 p.id,
    //                 0xffffff,
    //                 "small-bold"
    //               );
    //               secondoPast[p.id] = 0;
    //             }
    //             return;
    //           }
    //           if (knifepower) {
    //             if (Date.now() - secondoPast[p.id] >= 1000 && supers[p.id]) {
    //               room.sendAnnouncement(
    //                 `Knife Activated Powers are off for 30s!`,
    //                 p.id,
    //                 "0x60c9ec",
    //                 "small-bold"
    //               );
    //               secondoPast[p.id] = 0;
    //             }
    //             return;
    //           }

    //           let delay = 10;
    //           let coldown = 250000;
    //           if (supers[p.id] === "knife") {
    //             room.setPlayerAvatar(p.id, "🔪");
    //             knifepower = true;
    //             delay = 30000;
    //             coldown = 150000;
    //           } else if (supers[p.id] === "powershot") {
    //             room.setPlayerAvatar(p.id, "🚀");
    //             let introl = setInterval(() => {
    //               let ployerattrib = room.getPlayer(p.id);
    //               let ballPosition = room.getBallPosition();
    //               var distanceToplayer = pointDistance(
    //                 ployerattrib.position,
    //                 ballPosition
    //               );
    //               if (distanceToplayer < playerRadius + ballRadius + 1)
    //                 room.setDiscProperties(0, { invMass: definvMass * 1.5 });
    //             }, 30);
    //             setTimeout(() => {
    //               clearInterval(introl);
    //               let mapWidth, mapHeight;
    //               if (currentMap === "MA | SOLO by Simo") {
    //                 mapWidth = aloneMapWidth;
    //                 mapHeight = aloneMapHeight;
    //               } else if (currentMap === "MA | SMALL by Adl") {
    //                 mapWidth = smallMapWidth;
    //                 mapHeight = smallMapHeight;
    //               } else if (currentMap === "HHL 3V3 by Bnz") {
    //                 mapWidth = bigMapWidth;
    //                 mapHeight = bigMapHeight;
    //               }
    //               checkBallPosition(mapWidth, mapHeight);
    //               room.setDiscProperties(0, { invMass: definvMass });
    //             }, 2000);
    //             delay = 2000;
    //             coldown = 25000;
    //           } else if (supers[p.id] === "boost") {
    //             room.setPlayerAvatar(p.id, "💨");
    //             const magnitude = Math.sqrt(props.xspeed ** 2 + props.yspeed ** 2);
    //             if (magnitude) {
    //               const vecX = props.xspeed / magnitude;
    //               const vecY = props.yspeed / magnitude;
    //               room.setPlayerDiscProperties(p.id, {
    //                 xgravity: vecX * 0.08,
    //                 ygravity: vecY * 0.08,
    //               });
    //             }
    //             delay = 800;
    //             coldown = 25000;
    //           } else if (supers[p.id] === "ninja") {
    //             room.setPlayerAvatar(p.id, "🥷🏿");
    //             room.setPlayerDiscProperties(p.id, { cGroup: 0 });
    //             delay = 2500;
    //             coldown = 25000;
    //           } else if (supers[p.id] === "magnet") {
    //             room.setPlayerAvatar(p.id, "🧲");
    //             followON = true;
    //             playertofollowid = p.id;
    //             delay = 900;
    //             coldown = 15000;
    //           } else if (supers[p.id] === "curve") {
    //             room.setPlayerAvatar(p.id, "🌙");
    //             let introl = setInterval(() => {
    //               let ployerattrib = room.getPlayer(p.id);
    //               let ballPosition = room.getBallPosition();
    //               var distanceToplayer = pointDistance(
    //                 ployerattrib.position,
    //                 ballPosition
    //               );
    //               if (distanceToplayer < playerRadius + ballRadius + 0.1)
    //                 curveON = true;
    //             }, 30);
    //             setTimeout(() => {
    //               clearInterval(introl);
    //               curveON = false;
    //             }, 2000);
    //             delay = 2000;
    //             coldown = 25000;
    //           } else if (supers[p.id] === "gk") {
    //             room.setPlayerAvatar(p.id, "🥅");
    //             if (p.team == Team.RED) {
    //               room.setDiscProperties(5, {
    //                 x: room.getDiscProperties(1).x,
    //                 y:
    //                   room.getDiscProperties(1).y -
    //                   room.getDiscProperties(1).radius -
    //                   6,
    //               });
    //               room.setDiscProperties(6, {
    //                 x: room.getDiscProperties(2).x,
    //                 y:
    //                   room.getDiscProperties(2).y +
    //                   room.getDiscProperties(2).radius +
    //                   6,
    //               });
    //             } else if (p.team == Team.BLUE) {
    //               room.setDiscProperties(7, {
    //                 x: room.getDiscProperties(3).x,
    //                 y:
    //                   room.getDiscProperties(2).y +
    //                   room.getDiscProperties(2).radius +
    //                   6,
    //               });
    //               room.setDiscProperties(8, {
    //                 x: room.getDiscProperties(4).x,
    //                 y:
    //                   room.getDiscProperties(1).y -
    //                   room.getDiscProperties(1).radius -
    //                   6,
    //               });
    //             }
    //             delay = 3000;
    //             coldown = 15000;
    //           } else if (supers[p.id] === "freeze") {
    //             let playersPlay = room
    //               .getPlayerList()
    //               .filter(
    //                 (player) =>
    //                   player.id &&
    //                   player.id !== 0 &&
    //                   player.team !== Team.SPECTATORS &&
    //                   !getAFK(player)
    //               );
    //             playersPlay.forEach((ployer) => {
    //               let ployerattrib = room.getPlayerDiscProperties(ployer.id);
    //               let magnitude = Math.sqrt(
    //                 ployerattrib.xspeed ** 2 + ployerattrib.yspeed ** 2
    //               );
    //               if (magnitude) {
    //                 let vecX = ployerattrib.xspeed / magnitude;
    //                 let vecY = ployerattrib.yspeed / magnitude;
    //                 if (p.id !== ployer.id) {
    //                   room.setPlayerDiscProperties(ployer.id, {
    //                     xgravity: vecX * -0.06,
    //                     ygravity: vecY * -0.06,
    //                   });
    //                   room.setPlayerAvatar(ployer.id, "🧊");
    //                 }
    //               }
    //             });
    //             room.setPlayerAvatar(p.id, "⛸️");
    //             delay = 470;
    //             coldown = 30000;
    //           } else if (supers[p.id] == "kick") {
    //             room.setPlayerAvatar(p.id, "👟");
    //             let playersPlay = room
    //               .getPlayerList()
    //               .filter(
    //                 (player) =>
    //                   player.id &&
    //                   player.id !== 0 &&
    //                   player.team !== Team.SPECTATORS &&
    //                   !getAFK(player)
    //               );
    //             let introl = setInterval(() => {
    //               let ployerattrib = room.getPlayer(p.id);
    //               playersPlay.forEach((ployer) => {
    //                 let ployerprops = room.getPlayer(ployer.id);
    //                 var distanceToplayer = pointDistance(
    //                   ployerattrib.position,
    //                   ployerprops.position
    //                 );
    //                 if (distanceToplayer < playerRadius * 2 + 1) {
    //                   if (ployer.id != p.id)
    //                     room.setPlayerDiscProperties(ployer.id, {
    //                       cGroup:
    //                         room.getDiscProperties(0).cGroup -
    //                         room.CollisionFlags.score,
    //                     });
    //                 }
    //               });
    //             }, 100);
    //             setTimeout(() => {
    //               clearInterval(introl);
    //             }, 2000);
    //             delay = 2000;
    //             coldown = 10000;
    //           }
    //           setTimeout(() => {
    //             if (supers[p.id] === "powershot")
    //               room.setDiscProperties(0, { invMass: definvMass });
    //             else if (supers[p.id] === "boost")
    //               room.setPlayerDiscProperties(p.id, { xgravity: 0, ygravity: 0 });
    //             else if (supers[p.id] === "ninja")
    //               room.setPlayerDiscProperties(p.id, { cGroup: 2 });
    //             else if (supers[p.id] === "magnet") followON = false;
    //             else if (supers[p.id] === "knife") knifepower = false;
    //             else if (supers[p.id] === "curve") {
    //               room.setDiscProperties(0, { xgravity: 0, ygravity: 0 });
    //               curveON = false;
    //             } else if (supers[p.id] === "gk") {
    //               if (p.team == Team.RED) {
    //                 room.setDiscProperties(5, { x: 1000, y: 1000 });
    //                 room.setDiscProperties(6, { x: 1000, y: -1000 });
    //               } else if (p.team == Team.BLUE) {
    //                 room.setDiscProperties(7, { x: -1000, y: 1000 });
    //                 room.setDiscProperties(8, { x: -1000, y: -1000 });
    //               }
    //             } else if (supers[p.id] === "freeze") {
    //               let playersPlay = room
    //                 .getPlayerList()
    //                 .filter(
    //                   (player) =>
    //                     player.id &&
    //                     player.id !== 0 &&
    //                     player.team !== Team.SPECTATORS &&
    //                     !getAFK(player)
    //                 );
    //               playersPlay.forEach((ployer) => {
    //                 if (ployer.id != p.id)
    //                   room.setPlayerDiscProperties(ployer.id, {
    //                     xgravity: 0,
    //                     ygravity: 0,
    //                   });
    //                 if (ployer.id != p.id) room.setPlayerAvatar(ployer.id, null);
    //               });
    //             } else if (supers[p.id] === "kick") {
    //               let playersPlay = room
    //                 .getPlayerList()
    //                 .filter(
    //                   (player) =>
    //                     player.id &&
    //                     player.id !== 0 &&
    //                     player.team !== Team.SPECTATORS &&
    //                     !getAFK(player)
    //                 );
    //               playersPlay.forEach((ployer) => {
    //                 if (ployer.id != p.id)
    //                   room.setPlayerDiscProperties(ployer.id, { cGroup: 2 });
    //               });
    //             }
    //             room.setPlayerAvatar(p.id, null);
    //           }, delay);

    //           cooldown[p.id] = coldown;
    //           setTimeout(() => {
    //             cooldown[p.id] = 0;
    //           }, coldown);
    //         }
    //       } else {
    //         pressStart[p.id] = null;
    //       }
    //     });
    //   }

    function ballfollowplayer() {
      var ballPosition = room.getBallPosition();
      var player = room.getPlayer(playertofollowid);
      if (player && player.position != null) {
        var distanceToplayer = pointDistance(player.position, ballPosition);
        if (distanceToplayer < playerRadius + ballRadius + 0.08) {
          const angle = Math.atan2(
            player.position.y - ballPosition.y,
            player.position.x - ballPosition.x
          );
          const newX = ballPosition.x + Math.cos(angle) * 7;
          const newY = ballPosition.y + Math.sin(angle) * 7;
          room.setDiscProperties(0, { x: newX, y: newY });
        }
      }

      // followON = false;
    }
    function ballmovefromgay() {
      var ballPosition = room.getBallPosition();
      var player = room.getPlayer(playertogayid);
      if (player && player.position != null) {
        var distanceToplayer = pointDistance(player.position, ballPosition);
        if (distanceToplayer < playerRadius + ballRadius + 7) {
          var angle = Math.atan2(
            player.position.y - ballPosition.y,
            player.position.x - ballPosition.x
          );
          var newX = ballPosition.x + Math.cos(angle) * 5 + 12;
          var newY = ballPosition.y + Math.sin(angle) * 5 + 12;
          let mapWidth, mapHeight;
          if (currentMap === "MA | SOLO by Simo") {
            mapWidth = aloneMapWidth;
            mapHeight = aloneMapHeight;
          } else if (currentMap === "MA | SMALL by Adl") {
            mapWidth = smallMapWidth;
            mapHeight = smallMapHeight;
          } else if (currentMap === "HHL 3V3 by Bnz") {
            mapWidth = bigMapWidth;
            mapHeight = bigMapHeight;
          }
          if (
            ballPosition.x < -mapWidth ||
            ballPosition.x > mapWidth ||
            ballPosition.y < -mapHeight ||
            ballPosition.y > mapHeight
          ) {
            if (newX < -mapWidth) newX = -mapWidth;
            if (newX > mapWidth) newX = mapWidth;
            if (newY < -mapHeight) newY = -mapHeight;
            if (newY > mapHeight) newY = mapHeight;
          }
          room.setDiscProperties(0, { x: newX, y: newY });
        }
      }
    }

    function getLastTouchOfTheBall() {
      const ballPosition = room.getBallPosition();
      updateTeams();
      for (var i = 0; i < players.length; i++) {
        if (players[i].position != null) {
          var distanceToBall = pointDistance(players[i].position, ballPosition);
          if (distanceToBall < triggerDistance) {
            !activePlay ? (activePlay = true) : null;
            if (
              lastTeamTouched == players[i].team &&
              lastPlayersTouched[0] != null &&
              lastPlayersTouched[0].id != players[i].id
            ) {
              lastPlayersTouched[1] = lastPlayersTouched[0];
              lastPlayersTouched[0] = players[i];
            }
            lastTeamTouched = players[i].team;
          }
        }
      }
    }

    function getStats() {
      // gives possession, ball speed and GK of each team
      if (activePlay) {
        updateTeams();
        lastTeamTouched == Team.RED ? Rposs++ : Bposs++;
        var ballPosition = room.getBallPosition();
        point[1] = point[0];
        point[0] = ballPosition;
        ballSpeed = (pointDistance(point[0], point[1]) * 60 * 60 * 60) / 15000;
        var k = [-1, Infinity];
        for (var i = 0; i < teamR.length; i++) {
          if (teamR[i].position.x < k[1]) {
            k[0] = teamR[i];
            k[1] = teamR[i].position.x;
          }
        }
        k[0] != -1 ? setGK(k[0], getGK(k[0]) + 1) : null;
        k = [-1, -Infinity];
        for (var i = 0; i < teamB.length; i++) {
          if (teamB[i].position.x > k[1]) {
            k[0] = teamB[i];
            k[1] = teamB[i].position.x;
          }
        }
        k[0] != -1 ? setGK(k[0], getGK(k[0]) + 1) : null;
        findGK();
      }
    }

    function updateStats() {
      if (
        players.length >= 2 * maxTeamSize &&
        (game.scores.time >= (5 / 6) * game.scores.timeLimit ||
          game.scores.red == game.scores.scoreLimit ||
          game.scores.blue == game.scores.scoreLimit) &&
        allReds.length >= maxTeamSize &&
        allBlues.length >= maxTeamSize
      ) {
        let stats;
        for (var i = 0; i < allReds.length; i++) {
          localStorage.getItem(getAuth(allReds[i]))
            ? (stats = JSON.parse(localStorage.getItem(getAuth(allReds[i]))))
            : (stats = [
                0,
                0,
                0,
                0,
                "0.00",
                0,
                0,
                0,
                0,
                "0.00",
                "player",
                allReds[i].name,
                0,
                "none",
              ]);
          stats[Ss.GA]++;
          lastWinner == Team.RED
            ? stats[Ss.WI]++
            : lastWinner == Team.BLUE
            ? stats[Ss.LS]++
            : stats[Ss.DR]++;
          stats[Ss.WR] = ((100 * stats[Ss.WI]) / stats[Ss.GA]).toPrecision(3);
          localStorage.setItem(getAuth(allReds[i]), JSON.stringify(stats));
        }
        for (var i = 0; i < allBlues.length; i++) {
          localStorage.getItem(getAuth(allBlues[i]))
            ? (stats = JSON.parse(localStorage.getItem(getAuth(allBlues[i]))))
            : (stats = [
                0,
                0,
                0,
                0,
                "0.00",
                0,
                0,
                0,
                0,
                "0.00",
                "player",
                allBlues[i].name,
                0,
                "none",
              ]);
          stats[Ss.GA]++;
          lastWinner == Team.BLUE
            ? stats[Ss.WI]++
            : lastWinner == Team.RED
            ? stats[Ss.LS]++
            : stats[Ss.DR]++;
          stats[Ss.WR] = ((100 * stats[Ss.WI]) / stats[Ss.GA]).toPrecision(3);
          localStorage.setItem(getAuth(allBlues[i]), JSON.stringify(stats));
        }
        for (var i = 0; i < game.goals.length; i++) {
          if (game.goals[i].striker != null) {
            if (
              allBlues
                .concat(allReds)
                .findIndex((player) => player.id == game.goals[i].striker.id) !=
                -1 &&
              game.goals[i].assist == null
            ) {
              stats = JSON.parse(
                localStorage.getItem(getAuth(game.goals[i].striker))
              );
              stats[Ss.GL]++;
              localStorage.setItem(
                getAuth(game.goals[i].striker),
                JSON.stringify(stats)
              );
            } else if (
              allBlues
                .concat(allReds)
                .findIndex((player) => player.id == game.goals[i].striker.id) !=
                -1 &&
              game.goals[i].assist != null
            ) {
              stats = JSON.parse(
                localStorage.getItem(getAuth(game.goals[i].striker))
              );
              stats[Ss.OG]++;
              localStorage.setItem(
                getAuth(game.goals[i].striker),
                JSON.stringify(stats)
              );
            }
          }
          if (game.goals[i].assist != null) {
            if (
              allBlues
                .concat(allReds)
                .findIndex(
                  (player) => player.name == game.goals[i].assist.name
                ) != -1
            ) {
              stats = JSON.parse(
                localStorage.getItem(getAuth(game.goals[i].assist))
              );
              stats[Ss.AS]++;
              localStorage.setItem(
                getAuth(game.goals[i].assist),
                JSON.stringify(stats)
              );
            }
          }
        }
        if (allReds.findIndex((player) => player.id == GKList[0].id) != -1) {
          stats = JSON.parse(localStorage.getItem(getAuth(GKList[0])));
          stats[Ss.GK]++;
          game.scores.blue == 0 ? stats[Ss.CS]++ : null;
          stats[Ss.CP] = ((100 * stats[Ss.CS]) / stats[Ss.GK]).toPrecision(3);
          localStorage.setItem(getAuth(GKList[0]), JSON.stringify(stats));
        }
        if (allBlues.findIndex((player) => player.id == GKList[1].id) != -1) {
          stats = JSON.parse(localStorage.getItem(getAuth(GKList[1])));
          stats[Ss.GK]++;
          game.scores.red == 0 ? stats[Ss.CS]++ : null;
          stats[Ss.CP] = ((100 * stats[Ss.CS]) / stats[Ss.GK]).toPrecision(3);
          localStorage.setItem(getAuth(GKList[1]), JSON.stringify(stats));
        }
      }
    }

    function findGK() {
      var tab = [
        [-1, ""],
        [-1, ""],
      ];
      for (var i = 0; i < extendedP.length; i++) {
        if (
          room.getPlayer(extendedP[i][eP.ID]) != null &&
          room.getPlayer(extendedP[i][eP.ID]).team == Team.RED
        ) {
          if (tab[0][0] < extendedP[i][eP.GK]) {
            tab[0][0] = extendedP[i][eP.GK];
            tab[0][1] = room.getPlayer(extendedP[i][eP.ID]);
          }
        } else if (
          room.getPlayer(extendedP[i][eP.ID]) != null &&
          room.getPlayer(extendedP[i][eP.ID]).team == Team.BLUE
        ) {
          if (tab[1][0] < extendedP[i][eP.GK]) {
            tab[1][0] = extendedP[i][eP.GK];
            tab[1][1] = room.getPlayer(extendedP[i][eP.ID]);
          }
        }
      }
      GKList = [tab[0][1], tab[1][1]];
    }

    /* EVENTS */

    var PlayerAuth = {};
    var PlayerConn = {};

    /* PLAYER MOVEMENT */
    room.onPlayerJoin = function (player) {
      for (var i in PlayerAuth) {
        //checking by using auth
        if (PlayerAuth[i].auth == player.auth) {
          room.kickPlayer(
            PlayerAuth[i].id,
            "❌Tab detection is blocked. Don't! Your tab in the room: " +
              player.name,
            false
          );
        }
      }
      PlayerAuth[player.auth] = player;
      for (var i in PlayerConn) {
        //checking by using conn
        if (PlayerConn[i].conn == player.conn) {
          room.kickPlayer(
            PlayerConn[i].id,
            "❌Tab detection is blocked. Don't! Your tab in the room: " +
              player.name,
            false
          );
        }
      }
      extendedP.push([player.id, player.auth, player.conn, false, 0, 0, false]);
      updateRoleOnPlayerIn();
      sendAnnouncementToDiscord(
        "```" +
          "[📝] Player info, conn, auth and data ⏰" +
          "\n" +
          "The player " +
          player.name +
          " came into the room." +
          "\n" +
          "conn: " +
          player.conn +
          " 🌎" +
          "\n" +
          "auth: " +
          player.auth +
          " 💻" +
          "\n" +
          "Date: " +
          `${getDateInfo()}` +
          "```"
      );
      clonekick(player); //kicks the second player that he has same name with a diffrent player
      //room.sendChat("👋🏼 And there, " + player.name + "! Welcome to HCA Futsal ! ", player.id, welcomeColor, 'bold',);
      //room.sendAnnouncement("👋🏼And there, " , player.id , "! Welcome to HCA Futsal ! ", 0x00BFF , "bold", 1);
      room.sendAnnouncement(
        "👋🏼 Hi there, " + player.name + "!",
        null,
        0x5ee7ff,
        "bold"
      );
      room.sendAnnouncement(
        "                                        💬 Discord Link: ➡ https://discord.gg/QMqfcYZYfk ⬅",
        null,
        0xf6ff43,
        "bold"
      );
    };

    room.onPlayerTeamChange = function (changedPlayer, byPlayer) {
      if (changedPlayer.id == 0) {
        room.setPlayerTeam(0, Team.SPECTATORS);
        return;
      }
      if (getAFK(changedPlayer) && changedPlayer.team != Team.SPECTATORS) {
        room.setPlayerTeam(changedPlayer.id, Team.SPECTATORS);
        room.sendAnnouncement(
          changedPlayer.name + " it's AFK! 😴",
          Cor.Laranja,
          "bold"
        );
        return;
      }
      updateTeams();
      if (room.getScores() != null) {
        var scores = room.getScores();
        if (
          changedPlayer.team != Team.SPECTATORS &&
          scores.time <= (3 / 4) * scores.timeLimit &&
          Math.abs(scores.blue - scores.red) < 2
        ) {
          changedPlayer.team == Team.RED
            ? allReds.push(changedPlayer)
            : allBlues.push(changedPlayer);
        }
      }
      if (changedPlayer.team == Team.SPECTATORS) {
        setActivity(changedPlayer, 0);
      }
      if (inChooseMode && resettingTeams == false && byPlayer.id == 0) {
        if (Math.abs(teamR.length - teamB.length) == teamS.length) {
          deactivateChooseMode();
          resumeGame();
          var b = teamS.length;
          if (teamR.length > teamB.length) {
            for (var i = 0; i < b; i++) {
              setTimeout(() => {
                room.setPlayerTeam(teamS[0].id, Team.BLUE);
              }, 200 * i);
            }
          } else {
            for (var i = 0; i < b; i++) {
              setTimeout(() => {
                room.setPlayerTeam(teamS[0].id, Team.RED);
              }, 200 * i);
            }
          }
          return;
        } else if (
          (teamR.length == maxTeamSize && teamB.length == maxTeamSize) ||
          (teamR.length == teamB.length && teamS.length < 2)
        ) {
          deactivateChooseMode();
          resumeGame();
        } else if (teamR.length <= teamB.length && redCaptainChoice != "") {
          // choice remembered
          redCaptainChoice == "top"
            ? room.setPlayerTeam(teamS[0].id, Team.RED)
            : redCaptainChoice == "random"
            ? room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.RED)
            : room.setPlayerTeam(teamS[teamS.length - 1].id, Team.RED);
          return;
        } else if (teamB.length < teamR.length && blueCaptainChoice != "") {
          blueCaptainChoice == "top"
            ? room.setPlayerTeam(teamS[0].id, Team.BLUE)
            : blueCaptainChoice == "random"
            ? room.setPlayerTeam(
                teamS[getRandomInt(teamS.length)].id,
                Team.BLUE
              )
            : room.setPlayerTeam(teamS[teamS.length - 1].id, Team.BLUE);
          return;
        } else {
          choosePlayer();
        }
      }
    };

    room.onPlayerLeave = function (player) {
      if (
        teamR.findIndex((red) => red.id == player.id) == 0 &&
        inChooseMode &&
        teamR.length <= teamB.length
      ) {
        choosePlayer();
        capLeft = true;
        setTimeout(() => {
          capLeft = false;
        }, 10);
      }
      if (
        teamB.findIndex((blue) => blue.id == player.id) == 0 &&
        inChooseMode &&
        teamB.length < teamR.length
      ) {
        choosePlayer();
        capLeft = true;
        setTimeout(() => {
          capLeft = false;
        }, 10);
      }
      setActivity(player, 0);
      updateRoleOnPlayerOut();
    };

    room.onPlayerKicked = function (kickedPlayer, _reason, ban, _byPlayer) {
      ban == true ? banList.push([kickedPlayer.name, kickedPlayer.id]) : null;
    };

    /* PLAYER ACTIVITY */

    let palavras = ["@everyone", "@here"], //swearing filter
      regex = new RegExp(palavras.join("|"), "gi");

    var emojis = [
      "😄",
      "😃",
      "😀",
      "😊",
      "☺",
      "😉",
      "😍",
      "😘",
      "😚",
      "😗",
      "😙",
      "😜",
      "😝",
      "😛",
      "😳",
      "😁",
      "😔",
      "😌",
      "😒",
      "😞",
      "😣",
      "😢",
      "😂",
      "😭",
      "😪",
      "😥",
      "😰",
      "😅",
      "😓",
      "😩",
      "😫",
      "😨",
      "😱",
      "😠",
      "😡",
      "😤",
      "😖",
      "😆",
      "😋",
      "😷",
      "😎",
      "😴",
      "😵",
      "😲",
      "😟",
      "😦",
      "😧",
      "😈",
      "👿",
      "😮",
      "😬",
      "😐",
      "😕",
      "😯",
      "😶",
      "😇",
      "😏",
      "😑",
      "👲",
      "👳",
      "👮",
      "👷",
      "💂",
      "👶",
      "👦",
      "👧",
      "👨",
      "👩",
      "👴",
      "👵",
      "👱",
      "👼",
      "👸",
      "😺",
      "😸",
      "😻",
      "😽",
      "😼",
      "🙀",
      "😿",
      "😹",
      "😾",
      "👹",
      "👺",
      "🙈",
      "🙉",
      "🙊",
      "💀",
      "👽",
      "💩",
      "🔥",
      "✨",
      "🌟",
      "💫",
      "💥",
      "💢",
      "💦",
      "💧",
      "💤",
      "💨",
      "👂",
      "👀",
      "👃",
      "👅",
      "👄",
      "👍",
      "👎",
      "👌",
      "👊",
      "✊",
      "✌",
      "👋",
      "✋",
      "👐",
      "👆",
      "👇",
      "👉",
      "👈",
      "🙌",
      "🙏",
      "☝",
      "👏",
      "💪",
      "🚶",
      "🏃",
      "💃",
      "👫",
      "👪",
      "👬",
      "👭",
      "💏",
      "💑",
      "👯",
      "🙆",
      "🙅",
      "💁",
      "🙋",
      "💆",
      "💇",
      "💅",
      "👰",
      "🙎",
      "🙍",
      "🙇",
      "🎩",
      "👑",
      "💄",
      "💛",
      "💙",
      "💜",
      "💚",
      "❤",
      "💔",
      "💗",
      "💓",
      "💕",
      "💖",
      "💞",
      "💘",
      "💌",
      "💋",
      "💍",
      "💎",
      "👤",
      "👥",
      "💬",
      "👣",
      "💭",
      "🐶",
      "🐺",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🐸",
      "🐯",
      "🐨",
      "🐻",
      "🐷",
      "🐽",
      "🐮",
      "🐗",
      "🐵",
      "🐒",
      "🐴",
      "🐑",
      "🐘",
      "🐼",
      "🐧",
      "🐦",
      "🐤",
      "🐥",
      "🐣",
      "🐔",
      "🐍",
      "🐢",
      "🐛",
      "🐝",
      "🐜",
      "🐞",
      "🐌",
      "🐙",
      "🐚",
      "🐠",
      "🐟",
      "🐬",
      "🐳",
      "🐋",
      "🐄",
      "🐏",
      "🐀",
      "🐃",
      "🐅",
      "🐇",
      "🐉",
      "🐎",
      "🐐",
      "🐓",
      "🐕",
      "🐖",
      "🐁",
      "🐂",
      "🐲",
      "🐡",
      "🐊",
      "🐫",
      "🐪",
      "🐆",
      "🐈",
      "🐩",
      "🐾",
      "💐",
      "🌸",
      "🌷",
      "🍀",
      "🌹",
      "🌻",
      "🌺",
      "🍁",
      "🍃",
      "🍂",
      "🌿",
      "🌾",
      "🍄",
      "🌵",
      "🌴",
      "🌲",
      "🌳",
      "🌰",
      "🌱",
      "🌼",
      "🌐",
      "🌞",
      "🌝",
      "🌚",
      "🌑",
      "🌒",
      "🌓",
      "🌔",
      "🌕",
      "🌖",
      "🌗",
      "🌘",
      "🌜",
      "🌛",
      "🌙",
      "🌍",
      "🌎",
      "🌏",
      "🌋",
      "🌌",
      "🌠",
      "⭐",
      "☀",
      "⛅",
      "☁",
      "⚡",
      "☔",
      "❄",
      "⛄",
      "🌀",
      "🌁",
      "🌈",
      "🌊",
      "🎍",
      "💝",
      "🎎",
      "🎒",
      "🎓",
      "🎏",
      "🎆",
      "🎇",
      "🎐",
      "🎑",
      "🎃",
      "👻",
      "🎅",
      "🎄",
      "🎁",
      "🎋",
      "🎉",
      "🎊",
      "💰",
      "💴",
      "💵",
      "💷",
      "💶",
      "💳",
      "💸",
      "📛",
      "🔬",
      "🔭",
      "📰",
      "🎨",
      "🎬",
      "🎤",
      "🎧",
      "🎼",
      "🎵",
      "🎶",
      "🎹",
      "🎻",
      "🎺",
      "🎷",
      "🎸",
      "👾",
      "🎮",
      "🃏",
      "🎴",
      "🀄",
      "🎲",
      "🎯",
      "🏈",
      "🏀",
      "⚽",
      "⚾",
      "🎾",
      "🎱",
      "🏉",
      "🎳",
      "⛳",
      "🚵",
      "🚴",
      "🏁",
      "🏇",
      "🏆",
      "🎿",
      "🏂",
      "🏊",
      "🏄",
      "🎣",
      "☕",
      "🍵",
      "🍶",
      "🍼",
      "🍺",
      "🍻",
      "🍸",
      "🍹",
      "🍷",
      "🍴",
      "🍕",
      "🍔",
      "🍟",
      "🍗",
      "🍖",
      "🍝",
      "🍛",
      "🍤",
      "🍱",
      "🍣",
      "🍥",
      "🍙",
      "🍘",
      "🍚",
      "🍜",
      "🍲",
      "🍢",
      "🍡",
      "🍳",
      "🍞",
      "🍩",
      "🍮",
      "🍦",
      "🍨",
      "🍧",
      "🎂",
      "🍰",
      "🍪",
      "🍫",
      "🍬",
      "🍭",
      "🍯",
      "🍎",
      "🍏",
      "🍊",
      "🍋",
      "🍒",
      "🍇",
      "🍉",
      "🍓",
      "🍑",
      "🍈",
      "🍌",
      "🍐",
      "🍍",
      "🍠",
      "🍆",
      "🍅",
    ];

    function randomColor() {
      var letters = "456789ABCDEF".split("");
      var color = "0x";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
      }
      return color;
    }
    var celebo = false;
    var celebPlayer = 1;
    var celebTeam = 1;
    var celebrat = "none";
    var celebrationCounter = 0;
    const celebrationDuration = 120; // 2 seconds * 60 ticks per second
    const colorChangeInterval = 1; // Change color every 2 ticks (120ms)

    function celebrate(player, celeb) {
      switch (celeb) {
        case "none":
          if (celebrationCounter === 0) {
            room.setPlayerAvatar(player, "🎯");
            setTimeout(() => {
              room.setPlayerAvatar(player, "⚽");
              setTimeout(() => {
                room.setPlayerAvatar(player, null);
                celebrationCounter = 0;
                celebo = false;
              }, 3000);
            }, 1200);
            celebrationCounter = celebrationDuration; // Skip to end of duration
          }
          break;

        case "small":
        case "big":
        case "gone":
        case "rgb":
        case "nigga":
        case "emoji":
        case "lag":
          if (celebrationCounter === 0 && celeb === "nigga") {
            room.setTeamColors(
              celebTeam,
              0.0,
              0x0000000,
              [0x000000, 0x000000, 0x000000]
            );
          } else if (celebrationCounter % colorChangeInterval === 0) {
            switch (celeb) {
              case "small":
                room.setPlayerDiscProperties(player, { radius: 10 });
                break;
              case "big":
                room.setPlayerDiscProperties(player, { radius: 60 });
                break;
              case "gone":
                room.setPlayerDiscProperties(player, { radius: 0 });
                break;
              case "rgb":
                room.setTeamColors(celebTeam, 0.0, 0x0000000, [randomColor()]);
                break;
              case "emoji":
                room.setPlayerAvatar(
                  player,
                  emojis[Math.floor(Math.random() * emojis.length)]
                );
                break;
              case "lag":
                room.setPlayerDiscProperties(player, {
                  xspeed: Math.random() * (1.5 - -1.5) - 1.5,
                  yspeed: Math.random() * (1.5 - -1.5) - 1.5,
                });
                break;
            }
          }
          celebrationCounter++;

          if (celebrationCounter >= celebrationDuration) {
            if (celeb === "rgb" || celeb === "nigga") {
              room.setTeamColors(
                celebTeam,
                celebTeam == 1 ? color_team1_a : color_team2_a,
                celebTeam == 1 ? color_team1_t : color_team2_t,
                celebTeam == 1 ? color_team1 : color_team2
              );
            } else if (celeb === "emoji") {
              room.setPlayerAvatar(player, null);
            } else if (celeb === "lag") {
              room.setPlayerDiscProperties(player, { xspeed: 0, yspeed: 0 });
            } else if (
              celeb === "small" ||
              celeb === "big" ||
              celeb === "gone"
            ) {
              room.setPlayerDiscProperties(player, { radius: 15 });
            }
            celebo = false;
            celebrationCounter = 0;
          }
          break;

        default:
          console.log("Unknown celebration type:", celeb);
          celebo = false;
          break;
      }
    }
    function sendPm(player, player2, message) {
      //!pv
      var message3 =
        "[ ID: " + player.id + " - 🔒💬] " + player.name + ": " + message;
      console.log(player2.name, "[PM]=> ", message3);
      room.sendAnnouncement(message3, player2.id, 0x8271ff, "normal", 2);
      room.sendAnnouncement(
        "[📨] Private Message Successfully Sent! ✅",
        player.id,
        0x19ff85,
        "normal",
        0
      );
    }
    function give_role(giver, player, role) {
      if (getAuth(player) != null) {
        if (localStorage.getItem(getAuth(player))) {
          let stats;
          localStorage.getItem(getAuth(player))
            ? (stats = JSON.parse(localStorage.getItem(getAuth(player))))
            : (stats = [
                0,
                0,
                0,
                0,
                "0.00",
                0,
                0,
                0,
                0,
                "0.00",
                "player",
                player.name,
                0,
                "none",
              ]);
          stats[Ss.RL] = role;
          localStorage.setItem(getAuth(player), JSON.stringify(stats));
        } else {
          stats = [
            0,
            0,
            0,
            0,
            "0.00",
            0,
            0,
            0,
            0,
            "0.00",
            "player",
            player.name,
            0,
            "none",
          ];
          localStorage.setItem(getAuth(player), JSON.stringify(stats));
        }
      } else {
        room.sendAnnouncement(
          "Player with no Auth cant have roles or stats!",
          giver.id,
          0x309d2b,
          "bold"
        );
      }
    }
    function selectSs(selected) {
      if (selected == 0) return "GA";
      if (selected == 1) return "WI";
      if (selected == 2) return "DR";
      if (selected == 3) return "LS";
      if (selected == 4) return "WR";
      if (selected == 5) return "GL";
      if (selected == 6) return "AS";
      if (selected == 7) return "GK";
      if (selected == 8) return "CS";
      if (selected == 9) return "CS%";
      if (selected == 10) return "RL";
      if (selected == 11) return "NK";
      if (selected == 12) return "OG";
      if (selected == 13) return "CL";
    }
    function edit_stats(editer, player, selected, quantity, bet) {
      if (getAuth(player) != null) {
        if (localStorage.getItem(getAuth(player))) {
          let stats;
          localStorage.getItem(getAuth(player))
            ? (stats = JSON.parse(localStorage.getItem(getAuth(player))))
            : (stats = [
                0,
                0,
                0,
                0,
                "0.00",
                0,
                0,
                0,
                0,
                "0.00",
                "player",
                player.name,
                0,
                "none",
              ]);
          stats[selected] = quantity;
          localStorage.setItem(getAuth(player), JSON.stringify(stats));
        } else {
          stats = [
            0,
            0,
            0,
            0,
            "0.00",
            0,
            0,
            0,
            0,
            "0.00",
            "player",
            player.name,
            0,
            "none",
          ];
          stats[selected] = quantity;
          localStorage.setItem(getAuth(player), JSON.stringify(stats));
        }
        selected = selectSs(selected);
        if (!bet)
          room.sendAnnouncement(
            `${editer.name} changed stats of ${player.name} (${selected}: ${quantity})`,
            editer.id,
            0x19ff85,
            "normal",
            0
          );
        if (!bet)
          room.sendAnnouncement(
            `${editer.name} changed stats of ${player.name} (${selected}: ${quantity})`,
            player.id,
            0x19ff85,
            "normal",
            0
          );
      }
    }

    room.onPlayerChat = function (player, message) {
      var originalMessage = message;

      //if (SlowMode.includes(player.id) == true) {
      //	room.sendAnnouncement("[💬] Slow Mode Is Active. You Can Only Send 1 Message Every 3 Seconds. ⏱", player.id, 0x00FF00, "bold", 2);

      //	return false;

      //}
      // if (player.admin == false && SlowMode.includes(player.id) == false) {
      //	SlowMode.push(player.id);

      //	setTimeout(function () {
      // SlowMode.splice(SlowMode.indexOf(player.id), 1);
      //			}, slowModeTime * 1000);

      //		}

      if (
        message.length > 1 &&
        message[0].toLowerCase() == "t" &&
        message[1] == " "
      ) {
        if (player.team != 0) {
          room.getPlayerList().forEach((element) => {
            if (element.team == player.team)
              room.sendAnnouncement(
                "[TEAM CHAT] " + player.name + ": " + message.substr(2),
                element.id,
                player.team == 1 ? 16725591 : 3261685,
                "bold",
                0
              );
          });
          return false;
        } else {
          room.getPlayerList().forEach((element) => {
            if (element.team == player.team)
              room.sendAnnouncement(
                "[TEAM CHAT] " + player.name + ": " + message.substr(2),
                element.id,
                0xf0f0f0,
                "bold",
                0
              );
          });
          return false;
        }
      }

      if (message.match(regex)) {
        room.sendAnnouncement("Never ping Discord nigger!", player.id);
        return false;
      }
      originalMessage = message;
      message = message.split(/ +/);
      player.team != Team.SPECTATORS ? setActivity(player, 0) : null;
      if (["!help"].includes(message[0].toLowerCase())) {
        room.sendChat(
          "[PV] Player commands: !me, !showme, !celeblist, !celeb <option>, !games, !wins, !goals, !assists, !cs, !afks, !mutes, !bans, !pm <id>, ",
          player.id
        );
        //   room.sendChat("[PV] Player commands: !powers", player.id);
        player.admin
          ? room.sendChat(
              "[PV] Admin : !lock, !unclock, !mute <duration = 3> #<id>, !unmute all/#<id>, !clearbans <number = all>, !slow <duration>, !endslow",
              player.id
            )
          : null;
        player.admin
          ? room.sendChat(
              "[PV] Admin : !edit <id> <stat> <quantity>, !clearchat, @vip/@gay/@unrole<player>, !teleport, !follow, !movegay <id>, !map0/1/2",
              player.id
            )
          : null;
      } else if (
        ["!update"].includes(message[0].toLowerCase()) &&
        player.admin
      ) {
        setTimeout((_) => {
          room.sendAnnouncement(
            `${player.name} cleared the chat`,
            null,
            0xffffff,
            "italic"
          );
          room.sendAnnouncement(
            `❗❗❗Attention: Update Incoming in a few seconds, feel free to Rejoin when Room is Closed.`,
            null,
            0xf09999,
            "bold",
            2
          );
          chatLock = true;
        }, 1000);
      } else if (["!pm"].includes(message[0].toLowerCase())) {
        var index = playersALL.findIndex((player) => player.id == message[1]);
        if (playersALL[index] !== undefined) {
          var playerReceiving = playersALL[index];
          var messageSending = message
            .slice(2)
            .join(" ")
            .split(/,(?=\S)/)
            .map((item) => item.trim());
          sendPm(player, playerReceiving, messageSending);
        } else {
          room.sendAnnouncement(
            "Player not found. (do '#' for id search)",
            player.id,
            0x309d2b,
            "bold"
          );
        }
        // } else if (
        //   ["!b"].includes(message[0].toLowerCase()) &&
        //   currentMap === "HHL 3V3 by Bnz" &&
        //   players.length >= maxTeamSize * 2
        // ) {
        //   if (bettimeout) {
        //     if (
        //       message.length >= 2 &&
        //       (message[1].toLowerCase() === "red" ||
        //         message[1].toLowerCase() === "blue" ||
        //         message[1] === "1" ||
        //         message[1] === "2")
        //     ) {
        //       let teambetstr = message[1].toLowerCase();
        //       let teambet =
        //         teambetstr === "red"
        //           ? 1
        //           : teambetstr === "blue"
        //           ? 2
        //           : teambetstr === "1"
        //           ? 1
        //           : 2;
        //       if (
        //         !(player.team === Team.RED && teambet == 2) &&
        //         !(player.team === Team.BLUE && teambet == 1)
        //       ) {
        //         if (
        //           message.length >= 3 &&
        //           (message[2] === "w" ||
        //             message[2] === "g" ||
        //             message[2] === "as" ||
        //             message[2] === "gk" ||
        //             message[2] === "cs")
        //         ) {
        //           let betchip = message[2];
        //           if (
        //             message.length >= 4 &&
        //             (message[3].toLowerCase() === "all" ||
        //               (!isNaN(message[3]) &&
        //                 0 < Number(message[3]) &&
        //                 Number(message[3]) <= 100))
        //           ) {
        //             let betquant =
        //               message[3].toLowerCase() === "all"
        //                 ? "all"
        //                 : Number(message[3]);
        //             if (getAuth(player) != null) {
        //               if (localStorage.getItem(getAuth(player))) {
        //                 let stats;
        //                 localStorage.getItem(getAuth(player))
        //                   ? (stats = JSON.parse(
        //                       localStorage.getItem(getAuth(player))
        //                     ))
        //                   : (stats = [
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       "0.00",
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       "0.00",
        //                       "player",
        //                       player.name,
        //                       0,
        //                       "none",
        //                     ]);
        //                 localStorage.setItem(
        //                   getAuth(player),
        //                   JSON.stringify(stats)
        //                 );
        //                 let selectedStat =
        //                   betchip === "w"
        //                     ? 1
        //                     : betchip === "g"
        //                     ? 5
        //                     : betchip === "as"
        //                     ? 6
        //                     : betchip === "gk"
        //                     ? 7
        //                     : 8;
        //                 if (
        //                   !(betquant === "all" && stats[selectedStat] > 0) &&
        //                   !(stats[selectedStat] - betquant >= 0)
        //                 ) {
        //                   room.sendAnnouncement(
        //                     `You dont have enough ${betchip} to make a bet of ${betquant}`,
        //                     player.id,
        //                     0x309d2b,
        //                     "bold"
        //                   );
        //                 } else {
        //                   if (betquant === "all")
        //                     betquant =
        //                       stats[selectedStat] >= 100
        //                         ? 100
        //                         : stats[selectedStat];
        //                   stats[selectedStat] -= betquant;
        //                   localStorage.setItem(
        //                     getAuth(player),
        //                     JSON.stringify(stats)
        //                   );
        //                   room.sendAnnouncement(
        //                     `Bet on Team ${teambetstr} with ${betchip}: ${betquant}`,
        //                     player.id,
        //                     0x73ec59,
        //                     "bold"
        //                   );
        //                   gamebets.push([
        //                     getAuth(player),
        //                     teambet,
        //                     betchip,
        //                     betquant,
        //                     player.name,
        //                     player.id,
        //                   ]);
        //                 }
        //               } else {
        //                 stats = [
        //                   0,
        //                   0,
        //                   0,
        //                   0,
        //                   "0.00",
        //                   0,
        //                   0,
        //                   0,
        //                   0,
        //                   "0.00",
        //                   "player",
        //                   player.name,
        //                   0,
        //                   "none",
        //                 ];
        //                 localStorage.setItem(
        //                   getAuth(player),
        //                   JSON.stringify(stats)
        //                 );
        //                 room.sendAnnouncement(
        //                   `You dont have enough ${betchip} to make a bet.`,
        //                   player.id,
        //                   0x309d2b,
        //                   "bold"
        //                 );
        //               }
        //             }
        //           } else {
        //             room.sendAnnouncement(
        //               "Invalid Quantity. (ie: !b red/blue/1/2 w/g/as/gk/cs 0/100/all)",
        //               player.id,
        //               0x309d2b,
        //               "bold"
        //             );
        //           }
        //         } else {
        //           room.sendAnnouncement(
        //             "Chip not specified. (ie: !b red/blue/1/2 w/g/as/gk/cs 0/100/all)",
        //             player.id,
        //             0x309d2b,
        //             "bold"
        //           );
        //         }
        //       } else {
        //         room.sendAnnouncement(
        //           "You can't Bet on other team!",
        //           player.id,
        //           0x309d2b,
        //           "bold"
        //         );
        //       }
        //     } else {
        //       room.sendAnnouncement(
        //         "Team not specified. (ie: !b red/blue/1/2 w/g/as/gk/cs 0/100/all)",
        //         player.id,
        //         0x309d2b,
        //         "bold"
        //       );
        //     }
        //   } else {
        //     room.sendAnnouncement(
        //       "Betting Time Ended (20s).",
        //       player.id,
        //       0x309d2b,
        //       "bold"
        //     );
        //   //   }
        // } else if (
        //   ["!boost"].includes(message[0].toLowerCase()) &&
        //   cooldown[player.id] == 0
        // ) {
        //   supers[player.id] = "boost";
        //   room.sendAnnouncement(
        //     `💨 PowerUp changed to Boost, Now longpress.`,
        //     player.id,
        //     0xf09999,
        //     "bold"
        //   );
        // } else if (
        //   ["!powershot"].includes(message[0].toLowerCase()) &&
        //   cooldown[player.id] == 0
        // ) {
        //   supers[player.id] = "powershot";
        //   room.sendAnnouncement(
        //     `🚀 PowerUp changed to Powershot, Now longpress.`,
        //     player.id,
        //     0xf09999,
        //     "bold"
        //   );
        // } else if (
        //   ["!ninja"].includes(message[0].toLowerCase()) &&
        //   cooldown[player.id] == 0
        // ) {
        //   supers[player.id] = "ninja";
        //   room.sendAnnouncement(
        //     `🥷🏿 PowerUp changed to Ninja, Now longpress.`,
        //     player.id,
        //     0xf09999,
        //     "bold"
        //   );
        // } else if (
        //   ["!freeze"].includes(message[0].toLowerCase()) &&
        //   cooldown[player.id] == 0
        // ) {
        //   supers[player.id] = "freeze";
        //   room.sendAnnouncement(
        //     `🧊 PowerUp changed to Freeze, Now longpress.`,
        //     player.id,
        //     0xf09999,
        //     "bold"
        //   );
        // } else if (["!magnet"].includes(message[0].toLowerCase())) {
        //   supers[player.id] = "magnet";
        //   room.sendAnnouncement(
        //     `🧲 PowerUp changed to Magnet, Now longpress.`,
        //     player.id,
        //     0xf09999,
        //     "bold"
        //   );
        // } else if (["!kick"].includes(message[0].toLowerCase())) {
        //   supers[player.id] = "kick";
        //   room.sendAnnouncement(
        //     `👟 PowerUp changed to kick, Now longpress.`,
        //     player.id,
        //     0xf09999,
        //     "bold"
        //   );
        // } else if (["!curve"].includes(message[0].toLowerCase())) {
        //   supers[player.id] = "curve";
        //   room.sendAnnouncement(
        //     `🌙 PowerUp changed to kick, Now longpress.`,
        //     player.id,
        //     0xf09999,
        //     "bold"
        //   );
        // } else if (["!gk"].includes(message[0].toLowerCase())) {
        //   supers[player.id] = "gk";
        //   room.sendAnnouncement(
        //     `🥅 PowerUp changed to kick, Now longpress.`,
        //     player.id,
        //     0xf09999,
        //     "bold"
        //   );
        // } else if (["!knife"].includes(message[0].toLowerCase())) {
        //   let stats;
        //   localStorage.getItem(getAuth(player))
        //     ? (stats = JSON.parse(localStorage.getItem(getAuth(player))))
        //     : (stats = [
        //         0,
        //         0,
        //         0,
        //         0,
        //         "0.00",
        //         0,
        //         0,
        //         0,
        //         0,
        //         "0.00",
        //         "player",
        //         player.name,
        //         0,
        //         "none",
        //       ]);
        //   localStorage.setItem(getAuth(player), JSON.stringify(stats));
        //   if (stats[Ss.RL] === "vip" || player.admin) {
        //     supers[player.id] = "knife";
        //     room.sendAnnouncement(
        //       `🔪 PowerUp changed to kick, Now longpress.`,
        //       player.id,
        //       0xf09999,
        //       "bold"
        //     );
        //   } else {
        //     room.sendAnnouncement(
        //       "You need to be Vip!",
        //       player.id,
        //       0x309d2b,
        //       "bold"
        //     );
        //   }
        // } else if (message == "!powerup" && player.admin) {
        //   if (supersON) {
        //     room.sendAnnouncement(
        //       `${player.name} turned off power ups mode`,
        //       null,
        //       0xffffff,
        //       "italic"
        //     );
        //     supersON = false;
        //   } else {
        //     room.sendAnnouncement(
        //       `${player.name} turned on power ups mode`,
        //       null,
        //       0xffffff,
        //       "italic"
        //     );
        //     supersON = true;
        //   }
        // } else if (
        //   ["!bettax"].includes(message[0].toLowerCase()) &&
        //   !isNaN(message[1]) &&
        //   0 <= Number(message[1]) &&
        //   Number(message[1]) <= 100 &&
        //   player.admin
        // ) {
        //   room.sendAnnouncement(
        //     `${player.name} changed betting tax to ${100 - Number(message[1])}`,
        //     null,
        //     0xffffff,
        //     "italic"
        //   );
        //   betTax = Number(message[1]);
        // } else if (
        //   ["!curveang"].includes(message[0].toLowerCase()) &&
        //   !isNaN(message[1]) &&
        //   player.admin
        // ) {
        //   room.sendAnnouncement(
        //     `${player.name} changed curve angle to ${message[1]}`,
        //     null,
        //     0xffffff,
        //     "italic"
        //   );
        //   curveAng = Number(message[1]);
        // } else if (["!map0"].includes(message[0].toLowerCase())) {
        //   if (player.admin) {
        //     quickRestart();
        //     loadMap(aloneMap, 0, 0);
        //     log_cmd_used(player, "🗺️ map1", getAuth(player), "");
        //   } else {
        //     room.sendAnnouncement(
        //       "You Need to be Admin!!",
        //       player.id,
        //       0x309d2b,
        //       "bold"
        //     );
        //   }
        // } else if (["!map1"].includes(message[0].toLowerCase())) {
        //   if (player.admin) {
        //     quickRestart();
        //     loadMap(classicMap, scoreLimitClassic, timeLimitClassic);
        //     log_cmd_used(player, "🗺️ map1", getAuth(player), "");
        //   } else {
        //     room.sendAnnouncement(
        //       "You Need to be Admin!!",
        //       player.id,
        //       0x309d2b,
        //       "bold"
        //     );
        //   }
        // } else if (["!map2"].includes(message[0].toLowerCase())) {
        //   if (player.admin) {
        //     quickRestart();
        //     loadMap(bigMap, scoreLimitBig, timeLimitBig);
        //     log_cmd_used(player, "🗺️ map2", getAuth(player), "");
        //   } else {
        //     room.sendAnnouncement(
        //       "You Need to be Admin!!",
        //       player.id,
        //       0x309d2b,
        //       "bold"
        //     );
        //   }
        // }
        // if (["!size"].includes(message[0].toLowerCase())) {
        //   if (getAuth(player) != null) {
        //     if (localStorage.getItem(getAuth(player))) {
        //       let stats;
        //       localStorage.getItem(getAuth(player))
        //         ? (stats = JSON.parse(localStorage.getItem(getAuth(player))))
        //         : (stats = [
        //             0,
        //             0,
        //             0,
        //             0,
        //             "0.00",
        //             0,
        //             0,
        //             0,
        //             0,
        //             "0.00",
        //             "player",
        //             player.name,
        //             0,
        //             "none",
        //           ]);
        //       if (stats[Ss.RL] == "vip" || player.admin) {
        //         if (
        //           message.length >= 2 &&
        //           !isNaN(message[1]) &&
        //           10 <= Number(message[1]) &&
        //           Number(message[1] <= 25)
        //         ) {
        //           room.setPlayerDiscProperties(player.id, {
        //             radius: Number(message[1]),
        //           });
        //         } else {
        //           room.sendAnnouncement(
        //             "Usage: !size 15 (10-25,normal:15)",
        //             player.id,
        //             0x309d2b,
        //             "bold"
        //           );
        //         }
        //       } else {
        //         room.sendAnnouncement(
        //           "You Need to be Vip!",
        //           player.id,
        //           0x309d2b,
        //           "bold"
        //         );
        //       }
        //     } else {
        //       stats = [
        //         0,
        //         0,
        //         0,
        //         0,
        //         "0.00",
        //         0,
        //         0,
        //         0,
        //         0,
        //         "0.00",
        //         "player",
        //         player.name,
        //         0,
        //         "none",
        //       ];
        //       localStorage.setItem(getAuth(player), JSON.stringify(stats));
        //     }
        //   }
        // }
      }
      if (message == "!clearchat" && player.admin) {
        setTimeout((_) => {
          room.sendAnnouncement(
            `${player.name} cleared the chat`,
            null,
            0xffffff,
            "italic"
          );
        }, 1000);
      }
      if (message == "!teleport" && player.admin) {
        if (teleportON) {
          room.sendAnnouncement(
            `${player.name} turned off teleport mode`,
            null,
            0xffffff,
            "italic"
          );
          teleportON = false;
        } else {
          room.sendAnnouncement(
            `${player.name} turned on teleport mode`,
            null,
            0xffffff,
            "italic"
          );
          teleportON = true;
        }
      }
      if (message == "!follow" && player.admin) {
        if (followON) {
          room.sendAnnouncement(
            `${player.name} turned off follow mode`,
            null,
            0xffffff,
            "italic"
          );
          followON = false;
          playertofollowid = -1;
        } else {
          room.sendAnnouncement(
            `${player.name} turned on follow mode`,
            null,
            0xffffff,
            "italic"
          );
          playertofollowid = player.id;
          followON = true;
        }
      }
      if (message == "!supers" && player.admin) {
        if (supersON) {
          room.sendAnnouncement(
            `${player.name} turned off super mode`,
            null,
            0xffffff,
            "italic"
          );
          supersON = false;
        } else {
          room.sendAnnouncement(
            `${player.name} turned on super mode`,
            null,
            0xffffff,
            "italic"
          );
          supersON = true;
        }
      }
      if (["!movegay"].includes(message[0].toLowerCase()) && player.admin) {
        if (gayawayON) {
          room.sendAnnouncement(
            `${player.name} turned off gay move mode`,
            null,
            0xffffff,
            "italic"
          );
          gayawayON = false;
          playertogayid = -1;
        } else {
          var index =
            message.length >= 2
              ? playersALL.findIndex((player) => player.id == message[1])
              : -1;
          if (index != -1) {
            room.sendAnnouncement(
              `${player.name} turned on gay move mode`,
              null,
              0xffffff,
              "italic"
            );
            playertogayid = playersALL[index].id;
            gayawayON = true;
          } else {
            room.sendAnnouncement(
              "Player not found. (do '#' for id search)",
              player.id,
              0x309d2b,
              "bold"
            );
          }
        }
      }
      if (message == "!clearchat" && player.admin) {
        i = 50;
        while (i >= 0) {
          room.sendAnnouncement("", null);
          i--;
        }
      }
      if (message[0].toLowerCase().startsWith("@vip")) {
        var viped = originalMessage.substr(4);
        var index = playersALL.findIndex((player) => player.name === viped);
        if (index === -1) viped = viped.replace(/_/g, " ");
        index = playersALL.findIndex((player) => player.name === viped);
        if (index === -1) viped = viped.substr(0, viped.length - 1);
        index = playersALL.findIndex((player) => player.name === viped);
        if (index !== -1) {
          var playerReceiving = playersALL[index];
          if (player.admin) {
            give_role(player, playerReceiving, "vip");
            log_cmd_used(
              player,
              "⚜️ vip",
              getAuth(player),
              playerReceiving.name
            );
          } else {
            room.sendAnnouncement(
              "You Need to be Admin!!",
              player.id,
              0x309d2b,
              "bold"
            );
          }
        } else {
          room.sendAnnouncement(
            "Player not found.",
            player.id,
            0x309d2b,
            "bold"
          );
        }
        return false;
      }

      if (message[0].toLowerCase().startsWith("@gay")) {
        var gayped = originalMessage.substr(4);
        var index = playersALL.findIndex((player) => player.name === gayped);
        if (index === -1) gayped = gayped.replace(/_/g, " ");
        index = playersALL.findIndex((player) => player.name === gayped);
        if (index === -1) gayped = gayped.substr(0, gayped.length - 1);
        index = playersALL.findIndex((player) => player.name === gayped);
        if (index !== -1) {
          var playerReceiving = playersALL[index];
          if (player.admin) {
            give_role(player, playerReceiving, "gay");
            log_cmd_used(
              player,
              "🏳️‍🌈 gay",
              getAuth(player),
              playerReceiving.name
            );
          } else {
            room.sendAnnouncement(
              "You Need to be Admin!!",
              player.id,
              0x309d2b,
              "bold"
            );
          }
        } else {
          room.sendAnnouncement(
            "Player not found.",
            player.id,
            0x309d2b,
            "bold"
          );
        }
        return false;
      }

      if (message[0].toLowerCase().startsWith("@unrole")) {
        var unrole = originalMessage.substr(7);
        var index = playersALL.findIndex((player) => player.name === unrole);
        if (index === -1) unrole = unrole.replace(/_/g, " ");
        index = playersALL.findIndex((player) => player.name === unrole);
        if (index === -1) unrole = unrole.substr(0, unrole.length - 1);
        index = playersALL.findIndex((player) => player.name === unrole);
        if (index !== -1) {
          var playerReceiving = playersALL[index];
          if (player.admin) {
            give_role(player, playerReceiving, "player");
            log_cmd_used(
              player,
              "🏳️ unrole",
              getAuth(player),
              playerReceiving.name
            );
          } else {
            room.sendAnnouncement(
              "You Need to be Admin!!",
              player.id,
              0x309d2b,
              "bold"
            );
          }
        } else {
          room.sendAnnouncement(
            "Player not found.",
            player.id,
            0x309d2b,
            "bold"
          );
        }
        return false;
      } else if (["!afk"].includes(message[0].toLowerCase())) {
        if (players.length != 1 && player.team != Team.SPECTATORS) {
          if (
            player.team == Team.RED &&
            streak > 0 &&
            room.getScores() == null
          ) {
            room.setPlayerTeam(player.id, Team.SPECTATORS);
          } else {
            room.sendChat(
              "❌ You cannot go AFK in the middle of a match!",
              player.id
            );
            return false;
          }
        } else if (players.length == 1 && !getAFK(player)) {
          room.setPlayerTeam(player.id, Team.SPECTATORS);
        }
        setAFK(player, !getAFK(player));
        room.sendAnnouncement(
          player.name +
            (getAFK(player) ? " it's AFK! 😴" : " is no longer AFK!"),
          null,
          getAFK(player) ? 0xff5e3b : 0x26df17
        );
        getAFK(player) ? updateRoleOnPlayerOut() : updateRoleOnPlayerIn();
      } else if (["!afks", "!afklist"].includes(message[0].toLowerCase())) {
        var cstm = "[PV] List of AFK players: ";
        for (var i = 0; i < extendedP.length; i++) {
          if (
            room.getPlayer(extendedP[i][eP.ID]) != null &&
            getAFK(room.getPlayer(extendedP[i][eP.ID]))
          ) {
            if (
              140 - cstm.length <
              (room.getPlayer(extendedP[i][eP.ID]).name + ", ").length
            ) {
              room.sendChat(cstm, player.id);
              cstm = "... ";
            }
            cstm += room.getPlayer(extendedP[i][eP.ID]).name + ", ";
          }
        }
        if (cstm == "[PV] List of AFK players: ") {
          room.sendChat("[PV] There is no one on the AFK list!", player.id);
          return false;
        }
        cstm = cstm.substring(0, cstm.length - 2);
        cstm += ".";
        room.sendChat(cstm, player.id);
      }
      if (["!edit"].includes(message[0].toLowerCase())) {
        var index =
          message.length >= 2
            ? playersALL.findIndex((player) => player.id == message[1])
            : -1;
        if (index != -1) {
          var playerReceiving = playersALL[index];
          var selected;
          if (
            message.length >= 3 &&
            !Number.isNaN(message[2]) &&
            ((0 <= Number(message[2]) && Number(message[2]) <= 9) ||
              Number(message[2]) == 12)
          ) {
            selected = Number(message[2]);
            var quantity;
            if (message.length >= 4 && !Number.isNaN(message[3])) {
              quantity = Number(message[3]);
              if (player.admin) {
                edit_stats(player, playerReceiving, selected, quantity, false);
                log_cmd_used(
                  player,
                  "✍️ edit",
                  getAuth(player),
                  playerReceiving.name
                );
              } else {
                room.sendAnnouncement(
                  "You Need to be Admin!!",
                  player.id,
                  0x309d2b,
                  "bold"
                );
              }
            } else {
              room.sendAnnouncement(
                "Quantity not found.",
                player.id,
                0x309d2b,
                "bold"
              );
            }
          } else {
            room.sendAnnouncement(
              "STAT not found. (between 0-10)",
              player.id,
              0x309d2b,
              "bold"
            );
            room.sendAnnouncement(
              '["0-Games", "1-Wins", "2-Draws", "3-Losses", "4-Winrate", "5-Goals", "6-Assists", "7-GK", "8-CS", "9-CS%", "12-OwnGoals"]',
              player.id,
              0x309d2b,
              "bold"
            );
          }
        } else {
          room.sendAnnouncement(
            "Player not found. (do '#' for id search)",
            player.id,
            0x309d2b,
            "bold"
          );
        }
      } else if (["!customrank"].includes(message[0].toLowerCase())) {
        if (message.length >= 2 && message[1].length <= 5) {
          let rankname = message[1];
          let stats;
          localStorage.getItem(getAuth(player))
            ? (stats = JSON.parse(localStorage.getItem(getAuth(player))))
            : (stats = [
                0,
                0,
                0,
                0,
                "0.00",
                0,
                0,
                0,
                0,
                "0.00",
                "player",
                player.name,
                0,
                "none",
              ]);
          let stato =
            stats[Ss.WI] * 3 +
            stats[Ss.DR] +
            stats[Ss.GL] * 2 +
            stats[Ss.AS] +
            stats[Ss.CS] -
            stats[Ss.LS] * 2 -
            stats[Ss.OG];
          if (stato < 10000) {
            room.sendAnnouncement(
              "You need at least 10000 points!",
              player.id,
              0x309d2b,
              "bold"
            );
            localStorage.setItem(getAuth(player), JSON.stringify(stats));
            return false;
          }
          if (message.length >= 3) message[2] = message[2].toLowerCase();
          if (
            message.length >= 3 &&
            (message[2] === "w" ||
              message[2] === "g" ||
              message[2] === "as" ||
              message[2] === "gk" ||
              message[2] === "cs")
          ) {
            if (getAuth(player) != null) {
              let selectedStat =
                message[2] === "w"
                  ? 1
                  : message[2] === "g"
                  ? 5
                  : message[2] === "as"
                  ? 6
                  : message[2] === "gk"
                  ? 7
                  : 8;
              if (stats[selectedStat] >= 100) {
                stats[selectedStat] -= 100;
                let color = randomColor();
                let path = "./ranks.json";
                try {
                  let rawData = fs.readFileSync(path);
                  let jsonData = JSON.parse(rawData);
                  let newdata = {
                    auth: getAuth(player),
                    rank: rankname,
                    color: color,
                  };
                  let index = jsonData.findIndex(
                    (item) => item.auth === newdata.auth
                  );
                  if (index !== -1) {
                    jsonData[index] = newdata;
                  } else {
                    jsonData.push(newdata);
                  }
                  fs.writeFileSync(path, JSON.stringify(jsonData, null, 2));
                  room.sendAnnouncement(
                    `Rank changed to ${rankname} with color ${color}`,
                    player.id,
                    0x7cd3fa,
                    "normal"
                  );
                  room.sendAnnouncement(
                    `Color Example.`,
                    player.id,
                    color,
                    "normal"
                  );
                } catch (error) {
                  console.error("Error writing to the JSON file:", error);
                }
              } else {
                room.sendAnnouncement(
                  "You need at least 100 on the stat selected.",
                  player.id,
                  0x309d2b,
                  "bold"
                );
              }
              localStorage.setItem(getAuth(player), JSON.stringify(stats));
            }
          } else if (message.length == 2) {
            try {
              let path = "./ranks.json";
              let rawData = fs.readFileSync(path);
              let jsonData = JSON.parse(rawData);
              let index = jsonData.findIndex(
                (item) => item.auth === getAuth(player)
              );
              if (index !== -1) {
                jsonData[index].rank = rankname;
                room.sendAnnouncement(
                  `Rank changed to ${rankname}`,
                  player.id,
                  0x7cd3fa,
                  "normal"
                );
              } else {
                let newdata = {
                  auth: getAuth(player),
                  rank: rankname,
                  color: "0xbf8460",
                };
                room.sendAnnouncement(
                  `Rank changed to ${rankname} with color #bf8460`,
                  player.id,
                  0x7cd3fa,
                  "normal"
                );
                jsonData.push(newdata);
              }
              fs.writeFileSync(path, JSON.stringify(jsonData, null, 2));
            } catch (error) {
              console.error("Error writing to the JSON file:", error);
            }
          } else {
            room.sendAnnouncement(
              "Chip not Specified (w/g/as/gk/cs).",
              player.id,
              0x309d2b,
              "bold"
            );
          }
        } else {
          room.sendAnnouncement(
            "Rank not specified or too long(max:5ch).",
            player.id,
            0x309d2b,
            "bold"
          );
        }
      } else if (["!ranks"].includes(message[0].toLowerCase())) {
        room.sendAnnouncement(
          "_______________________________________",
          player.id,
          Cor.Amarelo,
          "bold"
        );
        room.sendAnnouncement(
          "Ranks per points:",
          player.id,
          Cor.Amarelo,
          "bold"
        );
        room.sendAnnouncement(
          "Bronze I - [🪙:10] | Bronze II - [🪙:20] | Bronze III - [🪙:30]",
          player.id,
          0xbc5e00,
          "normal"
        );
        room.sendAnnouncement(
          "Silver I - [🪙:50] | Silver II - [🪙:70] | Silver III - [🪙:90]",
          player.id,
          0xa2a2a2,
          "normal"
        );
        room.sendAnnouncement(
          "Gold I - [🪙:130] | Gold II - [🪙:160] | Gold III - [🪙:200]",
          player.id,
          0xeac274,
          "normal"
        );
        room.sendAnnouncement(
          "Type '!ranks2' to see more",
          player.id,
          Cor.Amarelo,
          "bold"
        );
        room.sendAnnouncement(
          "_______________________________________",
          player.id,
          Cor.Amarelo,
          "bold"
        );
      } else if (["!ranks2"].includes(message[0].toLowerCase())) {
        room.sendAnnouncement(
          "_______________________________________",
          player.id,
          Cor.Amarelo,
          "bold"
        );
        room.sendAnnouncement(
          "Platinum I - [🪙:260] | Platinum II - [🪙:320] | Platinum III - [🪙:380]",
          player.id,
          0x62aee3,
          "normal"
        );
        room.sendAnnouncement(
          "Diamond I - [🪙:460] | Diamond II - [🪙:560] | Diamond III - [🪙:700]",
          player.id,
          0x7cd3fa,
          "normal"
        );
        room.sendAnnouncement(
          "Diamond VI - [🪙:850]",
          player.id,
          0x7cd3fa,
          "normal"
        );
        room.sendAnnouncement(
          "Type '!ranks3' to see more",
          player.id,
          Cor.Amarelo,
          "bold"
        );
        room.sendAnnouncement(
          "_______________________________________",
          player.id,
          Cor.Amarelo,
          "bold"
        );
      } else if (["!ranks3"].includes(message[0].toLowerCase())) {
        room.sendAnnouncement(
          "_______________________________________",
          player.id,
          Cor.Amarelo,
          "bold"
        );
        room.sendAnnouncement(
          "The Legend I - [🪙:1000] | The Legend II - [🪙:1187] | The Legend III - [🪙:1374]",
          player.id,
          0x62aee3,
          "normal"
        );
        room.sendAnnouncement(
          "The Legend IV - [🪙:1561] | Obsidian I - [🪙:1748] | Obsidian II - [🪙:1935]",
          player.id,
          0x7cd3fa,
          "normal"
        );
        room.sendAnnouncement(
          "Obsidian III - [🪙:2122] | Obsidian IV - [🪙:2309]",
          player.id,
          0x7cd3fa,
          "normal"
        );
        room.sendAnnouncement(
          "Type '!ranks4' to see more",
          player.id,
          Cor.Amarelo,
          "bold"
        );
        room.sendAnnouncement(
          "_______________________________________",
          player.id,
          Cor.Amarelo,
          "bold"
        );
      } else if (["!ranks4"].includes(message[0].toLowerCase())) {
        room.sendAnnouncement(
          "_______________________________________",
          player.id,
          Cor.Amarelo,
          "bold"
        );
        room.sendAnnouncement(
          "Mythril I - [🪙:2496] | Mythril II - [🪙:2683] | Mythril III - [🪙:2870]",
          player.id,
          0x62aee3,
          "normal"
        );
        room.sendAnnouncement(
          "Mythril IV - [🪙:3057] | Crystal I - [🪙:3244] | Crystal II - [🪙:3431]",
          player.id,
          0x7cd3fa,
          "normal"
        );
        room.sendAnnouncement(
          "Crystal III - [🪙:3618] | Crystal IV - [🪙:3805]",
          player.id,
          0x7cd3fa,
          "normal"
        );
        room.sendAnnouncement(
          "Type '!ranks5' to see more",
          player.id,
          Cor.Amarelo,
          "bold"
        );
        room.sendAnnouncement(
          "_______________________________________",
          player.id,
          Cor.Amarelo,
          "bold"
        );
      } else if (["!ranks5"].includes(message[0].toLowerCase())) {
        room.sendAnnouncement(
          "_______________________________________",
          player.id,
          Cor.Amarelo,
          "bold"
        );
        room.sendAnnouncement(
          "Titanium I - [🪙:3992] | Titanium II - [🪙:4179] | Titanium III - [🪙:4366]",
          player.id,
          0x62aee3,
          "normal"
        );
        room.sendAnnouncement(
          "Titanium IV - [🪙:4553] | Mythic I - [🪙:4740] | Mythic II - [🪙:4927]",
          player.id,
          0x7cd3fa,
          "normal"
        );
        room.sendAnnouncement(
          "Mythic III - [🪙:5114] | Mythic IV - [🪙:5301]",
          player.id,
          0x7cd3fa,
          "normal"
        );
        room.sendAnnouncement(
          "Type '!ranks6' to see more",
          player.id,
          Cor.Amarelo,
          "bold"
        );
        room.sendAnnouncement(
          "_______________________________________",
          player.id,
          Cor.Amarelo,
          "bold"
        );
      } else if (["!ranks6"].includes(message[0].toLowerCase())) {
        room.sendAnnouncement(
          "_______________________________________",
          player.id,
          Cor.Amarelo,
          "bold"
        );
        room.sendAnnouncement(
          "Celestial I - [🪙:5488] | Celestial II - [🪙:5675] | Celestial III - [🪙:5862]",
          player.id,
          0x62aee3,
          "normal"
        );
        room.sendAnnouncement(
          "Celestial IV - [🪙:6049] | Voidstone I - [🪙:6236] | Voidstone II - [🪙:6423]",
          player.id,
          0x7cd3fa,
          "normal"
        );
        room.sendAnnouncement(
          "Voidstone III - [🪙:6610] | Voidstone IV - [🪙:6797]",
          player.id,
          0x7cd3fa,
          "normal"
        );
        room.sendAnnouncement(
          "Type '!ranks7' to see more",
          player.id,
          Cor.Amarelo,
          "bold"
        );
        room.sendAnnouncement(
          "_______________________________________",
          player.id,
          Cor.Amarelo,
          "bold"
        );
      } else if (["!ranks7"].includes(message[0].toLowerCase())) {
        room.sendAnnouncement(
          "_______________________________________",
          player.id,
          Cor.Amarelo,
          "bold"
        );
        room.sendAnnouncement(
          "Ethereal I - [🪙:6984] | Ethereal II - [🪙:7171] | Ethereal III - [🪙:7358]",
          player.id,
          0x62aee3,
          "normal"
        );
        room.sendAnnouncement(
          "Ethereal IV - [🪙:7575] | Divine I - [🪙:7732] | Divine II - [🪙:7919]",
          player.id,
          0x7cd3fa,
          "normal"
        );
        room.sendAnnouncement(
          "Divine III - [🪙:8106] | Divine IV - [🪙:8293] | Divine V - [🪙:8480]",
          player.id,
          0x7cd3fa,
          "normal"
        );
        room.sendAnnouncement(
          "Type '!ranks8' to see more",
          player.id,
          Cor.Amarelo,
          "bold"
        );
        room.sendAnnouncement(
          "_______________________________________",
          player.id,
          Cor.Amarelo,
          "bold"
        );
      } else if (["!ranks8"].includes(message[0].toLowerCase())) {
        room.sendAnnouncement(
          "_______________________________________",
          player.id,
          Cor.Amarelo,
          "bold"
        );
        room.sendAnnouncement(
          "Ascendant I - [🪙:8667] | Ascendant II - [🪙:8854] | Ascendant III - [🪙:9041]",
          player.id,
          0x62aee3,
          "normal"
        );
        room.sendAnnouncement(
          "Ascendant IV - [🪙:9228] | Voidstone I - [🪙:9415] | Voidstone II - [🪙:9602]",
          player.id,
          0x7cd3fa,
          "normal"
        );
        room.sendAnnouncement(
          "Voidstone III - [🪙:9789] | Voidstone IV - [🪙:9976]",
          player.id,
          0x7cd3fa,
          "normal"
        );
        room.sendAnnouncement(
          "Primordial x3 - [🪙:10000]",
          player.id,
          0x7cd3fa,
          "normal"
        );
        room.sendAnnouncement(
          "_______________________________________",
          player.id,
          Cor.Amarelo,
          "bold"
        );
      } else if (["!rank"].includes(message[0].toLowerCase())) {
        let stats;
        localStorage.getItem(getAuth(player))
          ? (stats = JSON.parse(localStorage.getItem(getAuth(player))))
          : (stats = [
              0,
              0,
              0,
              0,
              "0.00",
              0,
              0,
              0,
              0,
              "0.00",
              "player",
              player.name,
              0,
              "none",
            ]);
        room.sendAnnouncement(
          "[🏆] Your stats: 🎮 Games: " +
            stats[Ss.GA] +
            ", ✅ Wins: " +
            stats[Ss.WI] +
            ", ⭕ Ties: " +
            stats[Ss.DR] +
            ", ❌ Defeats: " +
            stats[Ss.LS] +
            ", Percentage of wins: " +
            stats[Ss.WR] +
            "%, ⚽️ Goals: " +
            stats[Ss.GL] +
            ", 👟 Assists: " +
            stats[Ss.AS] +
            ", 🤚 GK: " +
            stats[Ss.GK] +
            ", 🤚 CS: " +
            stats[Ss.CS] +
            ", 🤚 CS%: " +
            stats[Ss.CP] +
            "%" +
            " 🤡 OG: " +
            stats[Ss.OG],
          player.id,
          0x73ec59,
          "bold"
        );
      } else if (["!me"].includes(message[0].toLowerCase())) {
        let stats;
        localStorage.getItem(getAuth(player))
          ? (stats = JSON.parse(localStorage.getItem(getAuth(player))))
          : (stats = [
              0,
              0,
              0,
              0,
              "0.00",
              0,
              0,
              0,
              0,
              "0.00",
              "player",
              player.name,
              0,
              "none",
            ]);
        room.sendAnnouncement(
          "[🏆] Your stats: 🎮 Games: " +
            stats[Ss.GA] +
            ", ✅ Wins: " +
            stats[Ss.WI] +
            ", ⭕ Ties: " +
            stats[Ss.DR] +
            ", ❌ Defeats: " +
            stats[Ss.LS] +
            ", Percentage of wins: " +
            stats[Ss.WR] +
            "%, ⚽️ Goals: " +
            stats[Ss.GL] +
            ", 👟 Assists: " +
            stats[Ss.AS] +
            ", 🤚 GK: " +
            stats[Ss.GK] +
            ", 🤚 CS: " +
            stats[Ss.CS] +
            ", 🤚 CS%: " +
            stats[Ss.CP] +
            "%" +
            " 🤡 OG: " +
            stats[Ss.OG],
          player.id,
          0x73ec59,
          "bold"
        );
      } else if (["!showme"].includes(message[0].toLowerCase())) {
        let stats;
        localStorage.getItem(getAuth(player))
          ? (stats = JSON.parse(localStorage.getItem(getAuth(player))))
          : (stats = [
              0,
              0,
              0,
              0,
              "0.00",
              0,
              0,
              0,
              0,
              "0.00",
              "player",
              player.name,
              0,
              "none",
            ]);
        room.sendAnnouncement(
          "[🏆] Stats of " +
            player.name +
            ": 🎮 Games: " +
            stats[Ss.GA] +
            ", ✅ Wins: " +
            stats[Ss.WI] +
            ", ⭕ Ties: " +
            stats[Ss.DR] +
            ", ❌ Defeats: " +
            stats[Ss.LS] +
            ", Percentage of wins: " +
            stats[Ss.WR] +
            "%, ⚽️ Goals: " +
            stats[Ss.GL] +
            ", 👟 Assists: " +
            stats[Ss.AS] +
            ", 🤚 GK: " +
            stats[Ss.GK] +
            ", 🤚 CS: " +
            stats[Ss.CS] +
            ", 🤚 CS%: " +
            stats[Ss.CP] +
            "%" +
            " 🤡 OG: " +
            stats[Ss.OG],
          null,
          0x73ec59,
          "bold"
        );
      } else if (["!games"].includes(message[0].toLowerCase())) {
        // mostra o ranking de partidas jogadas
        var tableau = [];
        try {
          Object.keys(localStorage).forEach(function (key) {
            if (
              ![
                "player_name",
                "view_mode",
                "geo",
                "avatar",
                "player_auth_key",
              ].includes(key)
            ) {
              tableau.push([
                JSON.parse(localStorage.getItem(key))[Ss.NK],
                JSON.parse(localStorage.getItem(key))[Ss.GA],
              ]);
            }
          });
        } catch {}
        if (tableau.length < 5) {
          room.sendAnnouncement(
            "[PV] Not enough games have been played yet.",
            player.id,
            0xff0000
          );
          return false;
        }
        tableau.sort(function (a, b) {
          return b[1] - a[1];
        });
        room.sendAnnouncement(
          "[🏆] 🎮 Matches Played> #1 " +
            tableau[0][0] +
            ": " +
            tableau[0][1] +
            " #2 " +
            tableau[1][0] +
            ": " +
            tableau[1][1] +
            " #3 " +
            tableau[2][0] +
            ": " +
            tableau[2][1] +
            " #4 " +
            tableau[3][0] +
            ": " +
            tableau[3][1] +
            " #5 " +
            tableau[4][0] +
            ": " +
            tableau[4][1],
          player.id,
          0x73ec59
        );
        return false;
      } else if (["!wins"].includes(message[0].toLowerCase())) {
        // mostra o ranking de vitórias jogadas
        var tableau = [];
        try {
          Object.keys(localStorage).forEach(function (key) {
            if (
              ![
                "player_name",
                "view_mode",
                "geo",
                "avatar",
                "player_auth_key",
              ].includes(key)
            ) {
              tableau.push([
                JSON.parse(localStorage.getItem(key))[Ss.NK],
                JSON.parse(localStorage.getItem(key))[Ss.WI],
              ]);
            }
          });
        } catch {}
        if (tableau.length < 5) {
          room.sendAnnouncement(
            "[PV] Not enough games played yet.",
            player.id,
            0x73ec59
          );
          return false;
        }
        tableau.sort(function (a, b) {
          return b[1] - a[1];
        });
        room.sendAnnouncement(
          "[🏆] ✅ Wins> #1 " +
            tableau[0][0] +
            ": " +
            tableau[0][1] +
            " #2 " +
            tableau[1][0] +
            ": " +
            tableau[1][1] +
            " #3 " +
            tableau[2][0] +
            ": " +
            tableau[2][1] +
            " #4 " +
            tableau[3][0] +
            ": " +
            tableau[3][1] +
            " #5 " +
            tableau[4][0] +
            ": " +
            tableau[4][1],
          player.id,
          0x73ec59
        );

        return false;
      } else if (["!goals"].includes(message[0].toLowerCase())) {
        var tableau = [];
        try {
          Object.keys(localStorage).forEach(function (key) {
            if (
              ![
                "player_name",
                "view_mode",
                "geo",
                "avatar",
                "player_auth_key",
              ].includes(key)
            ) {
              tableau.push([
                JSON.parse(localStorage.getItem(key))[Ss.NK],
                JSON.parse(localStorage.getItem(key))[Ss.GL],
              ]);
            }
          });
        } catch {}
        if (tableau.length < 5) {
          room.sendAnnouncement(
            "[PV] Not enough games have been played yet.",
            player.id,
            0x73ec59
          );
          return false;
        }
        tableau.sort(function (a, b) {
          return b[1] - a[1];
        });
        room.sendAnnouncement(
          "[🏆] ⚽️ Goals> #1 " +
            tableau[0][0] +
            ": " +
            tableau[0][1] +
            " #2 " +
            tableau[1][0] +
            ": " +
            tableau[1][1] +
            " #3 " +
            tableau[2][0] +
            ": " +
            tableau[2][1] +
            " #4 " +
            tableau[3][0] +
            ": " +
            tableau[3][1] +
            " #5 " +
            tableau[4][0] +
            ": " +
            tableau[4][1],
          player.id,
          0x73ec59
        );
        return false;
      } else if (["!assists"].includes(message[0].toLowerCase())) {
        // mostra o ranking de assistencias
        var tableau = [];
        try {
          Object.keys(localStorage).forEach(function (key) {
            if (
              ![
                "player_name",
                "view_mode",
                "geo",
                "avatar",
                "player_auth_key",
              ].includes(key)
            ) {
              tableau.push([
                JSON.parse(localStorage.getItem(key))[Ss.NK],
                JSON.parse(localStorage.getItem(key))[Ss.AS],
              ]);
            }
          });
        } catch {}
        if (tableau.length < 5) {
          room.sendAnnouncement(
            "[PV] Not enough games have been played yet.",
            player.id
          );
          return false;
        }
        tableau.sort(function (a, b) {
          return b[1] - a[1];
        });
        room.sendAnnouncement(
          "[🏆] 👟 Assists> #1 " +
            tableau[0][0] +
            ": " +
            tableau[0][1] +
            " #2 " +
            tableau[1][0] +
            ": " +
            tableau[1][1] +
            " #3 " +
            tableau[2][0] +
            ": " +
            tableau[2][1] +
            " #4 " +
            tableau[3][0] +
            ": " +
            tableau[3][1] +
            " #5 " +
            tableau[4][0] +
            ": " +
            tableau[4][1],
          player.id,
          0x73ec59
        );
        return false;
      } else if (["!owns"].includes(message[0].toLowerCase())) {
        // mostra o ranking de assistencias
        var tableau = [];
        try {
          Object.keys(localStorage).forEach(function (key) {
            if (
              ![
                "player_name",
                "view_mode",
                "geo",
                "avatar",
                "player_auth_key",
              ].includes(key)
            ) {
              tableau.push([
                JSON.parse(localStorage.getItem(key))[Ss.NK],
                JSON.parse(localStorage.getItem(key))[Ss.OG],
              ]);
            }
          });
        } catch {}
        if (tableau.length < 5) {
          room.sendAnnouncement(
            "[PV] Not enough games have been played yet.",
            player.id
          );
          return false;
        }
        tableau.sort(function (a, b) {
          return b[1] - a[1];
        });
        room.sendAnnouncement(
          "[🏆] 👟 Assists> #1 " +
            tableau[0][0] +
            ": " +
            tableau[0][1] +
            " #2 " +
            tableau[1][0] +
            ": " +
            tableau[1][1] +
            " #3 " +
            tableau[2][0] +
            ": " +
            tableau[2][1] +
            " #4 " +
            tableau[3][0] +
            ": " +
            tableau[3][1] +
            " #5 " +
            tableau[4][0] +
            ": " +
            tableau[4][1],
          player.id,
          0x73ec59
        );
        return false;
      } else if (["!cs"].includes(message[0].toLowerCase())) {
        // mostra o ranking de defesas [GK]
        var tableau = [];
        try {
          Object.keys(localStorage).forEach(function (key) {
            if (
              ![
                "player_name",
                "view_mode",
                "geo",
                "avatar",
                "player_auth_key",
              ].includes(key)
            ) {
              tableau.push([
                JSON.parse(localStorage.getItem(key))[Ss.NK],
                JSON.parse(localStorage.getItem(key))[Ss.CS],
              ]);
            }
          });
        } catch {}
        if (tableau.length < 5) {
          room.sendAnnouncement(
            "[PV] Not enough games have been played yet.",
            player.id,
            0x73ec59
          );
          return false;
        }
        tableau.sort(function (a, b) {
          return b[1] - a[1];
        });
        room.sendAnnouncement(
          "[🏆] 🤚 CS> #1 " +
            tableau[0][0] +
            ": " +
            tableau[0][1] +
            " #2 " +
            tableau[1][0] +
            ": " +
            tableau[1][1] +
            " #3 " +
            tableau[2][0] +
            ": " +
            tableau[2][1] +
            " #4 " +
            tableau[3][0] +
            ": " +
            tableau[3][1] +
            " #5 " +
            tableau[4][0] +
            ": " +
            tableau[4][1],
          player.id,
          0x73ec59
        );
        return false;
      } else if (["!lock"].includes(message[0].toLowerCase()) && player.admin) {
        room.sendAnnouncement("🔒 Chat is Locked!", null, 0xff00ff, "bold");

        chatLock = true;
        log_cmd_used(player, player.auth, "lock", "room");
      } else if (
        ["!unlock"].includes(message[0].toLowerCase()) &&
        player.admin
      ) {
        room.sendAnnouncement("🪧 Chat is Unlocked!", null, 0x000040, "bold");

        chatLock = false;
        log_cmd_used(player, player.auth, "unlock", "room");

        return false;
      } else if (["!loginadm"].includes(message[0].toLowerCase())) {
        if (message[1] == adminPassword || message[1] === adminPassword) {
          room.setPlayerAdmin(player.id, true);
          // let stats;
          // localStorage.getItem(getAuth(player)) ? (stats = JSON.parse(localStorage.getItem(getAuth(player)))) : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", "player", player.name, 0, "none"]);
          // if (stats[Ss.RL] != "master") {
          // stats[Ss.RL] = "master";
          // room.sendChat(player.name + " was promoted to Administrator");
          // localStorage.setItem(getAuth(player), JSON.stringify(stats));
          // }
          return false;
        }
      } else if (["!setadmin", "!admin"].includes(message[0].toLowerCase())) {
        if (
          localStorage.getItem(getAuth(player)) &&
          JSON.parse(localStorage.getItem(getAuth(player)))[Ss.RL] == "master"
        ) {
          if (message.length >= 2 && message[1][0] == "#") {
            message[1] = message[1].substring(1, message[1].length);
            if (
              !Number.isNaN(Number.parseInt(message[1])) &&
              room.getPlayer(Number.parseInt(message[1])) != null
            ) {
              let stats;
              localStorage.getItem(
                getAuth(room.getPlayer(Number.parseInt(message[1])))
              )
                ? (stats = JSON.parse(
                    localStorage.getItem(
                      getAuth(room.getPlayer(Number.parseInt(message[1])))
                    )
                  ))
                : (stats = [
                    0,
                    0,
                    0,
                    0,
                    "0.00",
                    0,
                    0,
                    0,
                    0,
                    "0.00",
                    "player",
                    room.getPlayer(Number.parseInt(message[1])).name,
                    0,
                    "none",
                  ]);
              if (stats[Ss.RL] == "player") {
                stats[Ss.RL] = "admin";
                localStorage.setItem(
                  getAuth(room.getPlayer(Number.parseInt(message[1]))),
                  JSON.stringify(stats)
                );
                room.sendChat(
                  room.getPlayer(Number.parseInt(message[1])).name +
                    " is now a room admin!"
                );
                log_cmd_used(player, player.auth, "admin", message[1].name);
              }
            }
          }
        }
      } else if (
        ["!setplayer", "!removeadmin"].includes(message[0].toLowerCase())
      ) {
        if (
          localStorage.getItem(getAuth(player)) &&
          JSON.parse(localStorage.getItem(getAuth(player)))[Ss.RL] == "master"
        ) {
          if (message.length >= 2 && message[1][0] == "#") {
            message[1] = message[1].substring(1, message[1].length);
            if (
              !Number.isNaN(Number.parseInt(message[1])) &&
              room.getPlayer(Number.parseInt(message[1])) != null
            ) {
              let stats;
              localStorage.getItem(
                getAuth(room.getPlayer(Number.parseInt(message[1])))
              )
                ? (stats = JSON.parse(
                    localStorage.getItem(
                      getAuth(room.getPlayer(Number.parseInt(message[1])))
                    )
                  ))
                : (stats = [
                    0,
                    0,
                    0,
                    0,
                    "0.00",
                    0,
                    0,
                    0,
                    0,
                    "0.00",
                    "player",
                    room.getPlayer(Number.parseInt(message[1])).name,
                    0,
                    "none",
                  ]);
              if (stats[Ss.RL] == "admin") {
                room.sendChat(
                  room.getPlayer(Number.parseInt(message[1])).name +
                    " no longer a room admin!"
                );
                stats[Ss.RL] = "player";
                localStorage.setItem(
                  getAuth(room.getPlayer(Number.parseInt(message[1]))),
                  JSON.stringify(stats)
                );
              }
            }
          }
        }
      } else if (["!mutes", "!mutelist"].includes(message[0].toLowerCase())) {
        var cstm = "[PV] list of muted: ";
        for (var i = 0; i < extendedP.length; i++) {
          if (
            room.getPlayer(extendedP[i][eP.ID]) != null &&
            getMute(room.getPlayer(extendedP[i][eP.ID]))
          ) {
            if (
              140 - cstm.length <
              (
                room.getPlayer(extendedP[i][eP.ID]).name +
                "[" +
                extendedP[i][eP.ID] +
                "], "
              ).length
            ) {
              room.sendChat(cstm, player.id);
              cstm = "... ";
            }
            cstm +=
              room.getPlayer(extendedP[i][eP.ID]).name +
              "[" +
              extendedP[i][eP.ID] +
              "], ";
          }
        }
        if (cstm == "[PV] list of muted: ") {
          room.sendChat("[PV] There is no one on the Muted list!", player.id);
          return false;
        }
        cstm = cstm.substring(0, cstm.length - 2);
        cstm += ".";
        room.sendChat(cstm, player.id);
      } else if (["!mute"].includes(message[0].toLowerCase())) {
        if (player.admin) {
          updateTeams();
          var timeOut;
          if (
            !Number.isNaN(Number.parseInt(message[1])) &&
            message.length > 1
          ) {
            if (Number.parseInt(message[1]) > 0) {
              timeOut = Number.parseInt(message[1]) * 60 * 1000;
            } else {
              timeOut = 3 * 60 * 1000;
            }
            if (message[2].length > 1 && message[2][0] == "#") {
              message[2] = message[2].substring(1, message[2].length);
              if (
                !Number.isNaN(Number.parseInt(message[2])) &&
                room.getPlayer(Number.parseInt(message[2])) != null
              ) {
                if (
                  room.getPlayer(Number.parseInt(message[2])).admin ||
                  getMute(room.getPlayer(Number.parseInt(message[2])))
                ) {
                  return false;
                }
                setTimeout(
                  function (player) {
                    setMute(player, false);
                  },
                  timeOut,
                  room.getPlayer(Number.parseInt(message[2]))
                );
                setMute(room.getPlayer(Number.parseInt(message[2])), true);
                room.sendChat(
                  room.getPlayer(Number.parseInt(message[2])).name +
                    " has been muted for " +
                    timeOut / 60000 +
                    " minutes!"
                );
                log_cmd_used(player, player.auth, "mute", message[2].name);
              }
            } else if (Number.isNaN(Number.parseInt(message[1]))) {
              if (message[1].length > 1 && message[1][0] == "#") {
                message[1] = message[1].substring(1, message[1].length);
                if (
                  !Number.isNaN(Number.parseInt(message[1])) &&
                  room.getPlayer(Number.parseInt(message[1])) != null
                ) {
                  if (
                    room.getPlayer(Number.parseInt(message[1])).admin ||
                    getMute(room.getPlayer(Number.parseInt(message[1])))
                  ) {
                    return false;
                  }
                  setTimeout(
                    function (player) {
                      setMute(player, false);
                    },
                    3 * 60 * 1000,
                    room.getPlayer(Number.parseInt(message[1]))
                  );
                  setMute(room.getPlayer(Number.parseInt(message[1])), true);
                  room.sendChat(
                    room.getPlayer(Number.parseInt(message[1])).name +
                      " was muted for 3 minutes!"
                  );
                  log_cmd_used(player, player.auth, "mute", message[1].name);
                }
              }
            }
          }
        }
      } else if (["!unmute"].includes(message[0].toLowerCase())) {
        if (player.admin && message.length >= 2) {
          if (message[1] == "all") {
            extendedP.forEach((ePlayer) => {
              ePlayer[eP.MUTE] = false;
            });
            room.sendChat("All demutated.");
          } else if (
            !Number.isNaN(Number.parseInt(message[1])) &&
            room.getPlayer(Number.parseInt(message[1])) != null &&
            getMute(room.getPlayer(Number.parseInt(message[1])))
          ) {
            setMute(room.getPlayer(Number.parseInt(message[1])), false);
            room.sendChat(
              room.getPlayer(Number.parseInt(message[1])).name +
                " was demutated!"
            );
          } else if (Number.isNaN(Number.parseInt(message[1]))) {
            if (message[1].length > 1 && message[1][0] == "#") {
              message[1] = message[1].substring(1, message[1].length);
              if (
                !Number.isNaN(Number.parseInt(message[1])) &&
                room.getPlayer(Number.parseInt(message[1])) != null &&
                getMute(room.getPlayer(Number.parseInt(message[1])))
              ) {
                setMute(room.getPlayer(Number.parseInt(message[1])), false);
                room.sendChat(
                  room.getPlayer(Number.parseInt(message[1])).name +
                    " was demutated!"
                );
              }
            }
          }
        }
      } else if (["!slow"].includes(message[0].toLowerCase())) {
        if (player.admin) {
          if (message.length == 1) {
            slowMode = 3;
            room.sendChat("3 seconds of slow mode on!");
          } else if (message.length == 3) {
            if (!Number.isNaN(Number.parseInt(message[1]))) {
              if (Number.parseInt(message[1]) > 0) {
                slowMode = Number.parseInt(message[1]);
                room.sendChat(slowMode + " seconds slow mode on!");
                return false;
              }
            }
            slowMode = 2;
            room.sendChat("3 seconds of slow mode on!");
          }
        }
      } else if (["!endslow"].includes(message[0].toLowerCase())) {
        if (player.admin) {
          slowMode != 0 ? room.sendChat("Slow mode has ended.") : null;
          slowMode = 0;
        }
      } else if (["!banlist", "!bans"].includes(message[0].toLowerCase())) {
        if (banList.length == 0) {
          room.sendChat("[PV] There is no one on the ban list!", player.id);
          return false;
        }
        var cstm = "[PV] Ban list ";
        for (var i = 0; i < banList.length; i++) {
          if (
            140 - cstm.length <
            (banList[i][0] + "[" + banList[i][1] + "], ").length
          ) {
            room.sendChat(cstm, player.id);
            cstm = "... ";
          }
          cstm += banList[i][0] + "[" + banList[i][1] + "], ";
        }
        cstm = cstm.substring(0, cstm.length - 2);
        cstm += ".";
        room.sendChat(cstm, player.id);
      } else if (["!clearbans"].includes(message[0].toLowerCase())) {
        if (player.admin) {
          if (message.length == 1) {
            room.clearBans();
            room.sendChat("[📜] Ban list has been cleared!");
            log_cmd_used(player, player.auth, "unban", "room");
            banList = [];
          }
          if (message.length == 2) {
            if (!Number.isNaN(Number.parseInt(message[1]))) {
              if (Number.parseInt(message[1]) > 0) {
                ID = Number.parseInt(message[1]);
                room.clearBan(ID);
                if (
                  banList.length != banList.filter((array) => array[1] != ID)
                ) {
                  room.sendChat(
                    banList.filter((array) => array[1] == ID)[0][0] +
                      " was unbanned from the room!"
                  );
                }
                setTimeout(() => {
                  banList = banList.filter((array) => array[1] != ID);
                }, 20);
              }
            }
          }
        }
      } else if (
        ["!bb", "!bye", "!cya", "!gn"].includes(message[0].toLowerCase()) ||
        (["9wdo"].includes(message[0].toLowerCase()) &&
          ["3liya"].includes(message[1].toLowerCase()))
      ) {
        room.kickPlayer(player.id, "Until next time, player!", false);
      } else if (
        ["!ds", "!dc", "!disc", "!discord"].includes(message[0].toLowerCase())
      ) {
        room.sendAnnouncement(
          "                                        ▒█▀▀▄ ▀█▀ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀▄ ",
          null,
          0x9250fd,
          "bold"
        );
        room.sendAnnouncement(
          "                                        ▒█░▒█ ▒█░ ░▀▀▀▄▄ ▒█░░░ ▒█░░▒█ ▒█▄▄▀ ▒█░▒█ ",
          null,
          0x8466fd,
          "bold"
        );
        room.sendAnnouncement(
          "                                        ▒█▄▄▀ ▄█▄ ▒█▄▄▄█ ▒█▄▄█ ▒█▄▄▄█ ▒█░▒█ ▒█▄▄▀ ",
          null,
          0x7b73fd,
          "bold"
        );
        room.sendAnnouncement(
          "                                        💬 Discord Link: ➡ https://discord.gg/QMqfcYZYfk ⬅",
          null,
          0xf6ff43,
          "bold"
        );
      } else if (["!celeblist"].includes(message[0].toLowerCase())) {
        room.sendAnnouncement(
          "Celebrations List:",
          player.id,
          0xeac274,
          "bold"
        );
        room.sendAnnouncement(
          "Big Celebration <big> || Small Celebration <small> ",
          player.id,
          0xeac274,
          "normal"
        );
        room.sendAnnouncement(
          "Rainbow Celebration <rgb> || Nigga Celebration <nigga>",
          player.id,
          0xeac274,
          "normal"
        );
        room.sendAnnouncement(
          "Emoji Celebration <emoji> || Disappear Celebration <gone> || Laggy Celebration <lag> ",
          player.id,
          0xeac274,
          "normal"
        );
        room.sendAnnouncement(
          "Example use: !celeb nigga",
          player.id,
          0xeac274,
          "bold"
        );
        return false;
        // } else if (["!powers"].includes(message[0].toLowerCase())) {
        //   room.sendAnnouncement("PowerUps List:", player.id, 0xeac274, "bold");
        //   room.sendAnnouncement(
        //     "Boost Powerup !boost || Ninja Powerup !ninja || Curve Powerup !curve",
        //     player.id,
        //     0xeac274,
        //     "normal"
        //   );
        //   room.sendAnnouncement(
        //     "Powershot Powerup !powershot || Freeze Powerup !freeze || Knife Powerup !knife",
        //     player.id,
        //     0xeac274,
        //     "normal"
        //   );
        //   room.sendAnnouncement(
        //     "Magnet Powerup !magnet || Kick Powerup !kick || GK Powerup !gk",
        //     player.id,
        //     0xeac274,
        //     "normal"
        //   );
        //   room.sendAnnouncement(
        //     "Example use: !powershot",
        //     player.id,
        //     0xeac274,
        //     "bold"
        //   );
        //   return false;
      } else if (["!celeb"].includes(message[0].toLowerCase())) {
        if (
          message.length >= 2 &&
          [
            "none",
            "small",
            "big",
            "gone",
            "lag",
            "rgb",
            "emoji",
            "nigga",
          ].includes(message[1].toLowerCase())
        ) {
          let stats;
          localStorage.getItem(getAuth(player))
            ? (stats = JSON.parse(localStorage.getItem(getAuth(player))))
            : (stats = [
                0,
                0,
                0,
                0,
                "0.00",
                0,
                0,
                0,
                0,
                "0.00",
                "player",
                player.name,
                0,
                "none",
              ]);
          stats[Ss.CL] = message[1].toLowerCase();
          localStorage.setItem(getAuth(player), JSON.stringify(stats));
          room.sendAnnouncement(
            `🔥 Celebration changed to ${message[1].toLowerCase()}`,
            player.id,
            0xf09999,
            "bold"
          );
        } else {
          room.sendAnnouncement(
            "❌ Option Not Valid, Choose from !celeblist",
            player.id,
            0xf09999,
            "bold"
          );
        }
        return false;
      } else if (["!code"].includes(message[0].toLowerCase()) && player.admin) {
        adminPassword = message[1];

        room.sendAnnouncement(
          `Code Changed! (${adminPassword})`,
          player.id,
          0x00ff00,
          "bold"
        );
        code_change(player.name, adminPassword);
        return false;
      }
      if (teamR.length != 0 && teamB.length != 0 && inChooseMode) {
        if (player.id == teamR[0].id || player.id == teamB[0].id) {
          // we care if it's one of the captains choosing
          if (teamR.length <= teamB.length && player.id == teamR[0].id) {
            // we care if it's red turn && red cap talking
            if (["top", "auto"].includes(message[0].toLowerCase())) {
              room.setPlayerTeam(teamS[0].id, Team.RED);
              redCaptainChoice = "top";
              clearTimeout(timeOutCap);
              room.sendChat(player.name + " recruited the first!");
              return false;
            } else if (["random", "rand"].includes(message[0].toLowerCase())) {
              var r = getRandomInt(teamS.length);
              room.setPlayerTeam(teamS[r].id, Team.RED);
              redCaptainChoice = "random";
              clearTimeout(timeOutCap);
              room.sendChat(player.name + " randomly recruited!");
              return false;
            } else if (["bottom", "bot"].includes(message[0].toLowerCase())) {
              room.setPlayerTeam(teamS[teamS.length - 1].id, Team.RED);
              redCaptainChoice = "bottom";
              clearTimeout(timeOutCap);
              room.sendChat(player.name + " recruited the last!");
              return false;
            } else if (!Number.isNaN(Number.parseInt(message[0]))) {
              if (
                Number.parseInt(message[0]) > teamS.length ||
                Number.parseInt(message[0]) < 1
              ) {
                room.sendChat("❌ Enter a valid number", player.id);
                return false;
              } else {
                room.setPlayerTeam(
                  teamS[Number.parseInt(message[0]) - 1].id,
                  Team.RED
                );
                room.sendChat(
                  player.name +
                    " recruited: " +
                    teamS[Number.parseInt(message[0]) - 1].name +
                    "!"
                );
                return false;
              }
            }
          }
          if (teamR.length > teamB.length && player.id == teamB[0].id) {
            // we care if it's red turn && red cap talking
            if (["top", "auto"].includes(message[0].toLowerCase())) {
              room.setPlayerTeam(teamS[0].id, Team.BLUE);
              blueCaptainChoice = "top";
              clearTimeout(timeOutCap);
              room.sendChat(player.name + " recruited the first!");
              return false;
            } else if (["random", "rand"].includes(message[0].toLowerCase())) {
              room.setPlayerTeam(
                teamS[getRandomInt(teamS.length)].id,
                Team.BLUE
              );
              blueCaptainChoice = "random";
              clearTimeout(timeOutCap);
              room.sendChat(player.name + " randomly recruited!");
              return false;
            } else if (["bottom", "bot"].includes(message[0].toLowerCase())) {
              room.setPlayerTeam(teamS[teamS.length - 1].id, Team.BLUE);
              blueCaptainChoice = "bottom";
              clearTimeout(timeOutCap);
              room.sendChat(player.name + " recruited the last one!");
              return false;
            } else if (!Number.isNaN(Number.parseInt(message[0]))) {
              if (
                Number.parseInt(message[0]) > teamS.length ||
                Number.parseInt(message[0]) < 1
              ) {
                room.sendChat("❌ Enter a valid number", player.id);
                return false;
              } else {
                room.setPlayerTeam(
                  teamS[Number.parseInt(message[0]) - 1].id,
                  Team.BLUE
                );
                room.sendChat(
                  player.name +
                    " recruited: " +
                    teamS[Number.parseInt(message[0]) - 1].name +
                    " !"
                );
                return false;
              }
            }
          }
        }
      }

      if (chatLock && !player.admin) {
        room.sendAnnouncement(
          "⛔ Chat is Locked!",
          player.id,
          0xff00ff,
          "bold"
        );

        return false;
      }

      if (message[0][0] == "!") {
        return false;
      }
      if (getMute(player)) {
        room.sendChat("Muted!", player.id);
        return false;
      }
      if (slowMode > 0) {
        if (!player.admin) {
          if (!SMSet.has(player.id)) {
            SMSet.add(player.id);
            setTimeout(
              (number) => {
                SMSet.delete(number);
              },
              slowMode * 1000,
              player.id
            );
          } else {
            return false;
          }
        }
      }

      if (localStorage.getItem(getAuth(player))) {
        let stats;
        localStorage.getItem(getAuth(player))
          ? (stats = JSON.parse(localStorage.getItem(getAuth(player))))
          : (stats = [
              0,
              0,
              0,
              0,
              "0.00",
              0,
              0,
              0,
              0,
              "0.00",
              "player",
              player.name,
              0,
              "none",
            ]);
        var announcement = "";
        var chatColor = "";
        let stato =
          stats[Ss.WI] * 3 +
          stats[Ss.DR] +
          stats[Ss.GL] * 2 +
          stats[Ss.AS] +
          stats[Ss.CS] -
          stats[Ss.LS] * 2 -
          stats[Ss.OG];
        var textorank = getPlayerRank(player);
        if (stato >= 10000) {
          let path = "./ranks.json";
          let rawdata = fs.readFileSync(path);
          let jsonData = JSON.parse(rawdata);
          let index = jsonData.findIndex(
            (item) => item.auth === getAuth(player)
          );
          if (index !== -1) {
            announcement += `[♾️] - [🪙: ${stato}] ·「${jsonData[index].rank}」`;
            chatColor = jsonData[index].color;
          } else {
            announcement += `[♾️] - [🪙: ${stato}]  ·${textorank}`;
            chatColor = "0x1a7e8c";
          }
        } else if (stato > 9976) {
          announcement += `[🌌] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x6c1aff";
        } else if (stato > 9789) {
          announcement += `[🌌] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x6c1aff";
        } else if (stato > 9602) {
          announcement += `[🌌] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x6c1aff";
        } else if (stato > 9415) {
          announcement += `[🌌] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x6c1aff";
        } else if (stato > 9228) {
          announcement += `[🪽] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xbfbdbd";
        } else if (stato > 9041) {
          announcement += `[🪽] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xbfbdbd";
        } else if (stato > 8854) {
          announcement += `[🪽] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xbfbdbd";
        } else if (stato > 8667) {
          announcement += `[🪽] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xbfbdbd";
        } else if (stato > 8480) {
          announcement += `[🌿] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xfcddae";
        } else if (stato > 8293) {
          announcement += `[🌿] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xfcddae";
        } else if (stato > 8106) {
          announcement += `[🌿] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xfcddae";
        } else if (stato > 7919) {
          announcement += `[🌿] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xfcddae";
        } else if (stato > 7732) {
          announcement += `[🌿] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xfcddae";
        } else if (stato > 7545) {
          announcement += `[🌙] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xb1b1f5";
        } else if (stato > 7358) {
          announcement += `[🌙] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xb1b1f5";
        } else if (stato > 7171) {
          announcement += `[🌙] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xb1b1f5";
        } else if (stato > 6984) {
          announcement += `[🌙] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xb1b1f5";
        } else if (stato > 6797) {
          announcement += `[🕳️] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x725980";
        } else if (stato > 6610) {
          announcement += `[🕳️] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x725980";
        } else if (stato > 6423) {
          announcement += `[🕳️] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x725980";
        } else if (stato > 6236) {
          announcement += `[🕳️] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x725980";
        } else if (stato > 6049) {
          announcement += `[✨] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xffc0cb";
        } else if (stato > 5862) {
          announcement += `[✨] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xffc0cb";
        } else if (stato > 5675) {
          announcement += `[✨] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xffc0cb";
        } else if (stato > 5488) {
          announcement += `[✨] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xffc0cb";
        } else if (stato > 5301) {
          announcement += `[💫] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xdbb456";
        } else if (stato > 5114) {
          announcement += `[💫] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xdbb456";
        } else if (stato > 4927) {
          announcement += `[💫] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xdbb456";
        } else if (stato > 4740) {
          announcement += `[💫] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xdbb456";
        } else if (stato > 4553) {
          announcement += `[⚙️] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x6d7f87";
        } else if (stato > 4366) {
          announcement += `[⚙️] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x6d7f87";
        } else if (stato > 4179) {
          announcement += `[⚙️] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x6d7f87";
        } else if (stato > 3992) {
          announcement += `[⚙️] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x6d7f87";
        } else if (stato > 3805) {
          announcement += `[🔮] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x00b4e6";
        } else if (stato > 3618) {
          announcement += `[🔮] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x00b4e6";
        } else if (stato > 3431) {
          announcement += `[🔮] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x00b4e6";
        } else if (stato > 3244) {
          announcement += `[🔮] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x00b4e6";
        } else if (stato > 3057) {
          announcement += `[🌟] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xffda75";
        } else if (stato > 2870) {
          announcement += `[🌟] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xffda75";
        } else if (stato > 2683) {
          announcement += `[🌟] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xffda75";
        } else if (stato > 2496) {
          announcement += `[🌟] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xffda75";
        } else if (stato > 2309) {
          announcement += `[🌑] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x57776e";
        } else if (stato > 2122) {
          announcement += `[🌑] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x57776e";
        } else if (stato > 1935) {
          announcement += `[🌑] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x57776e";
        } else if (stato > 1748) {
          announcement += `[🌑] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x57776e";
        } else if (stato > 1561) {
          announcement += `[👑] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xf77104";
        } else if (stato > 1374) {
          announcement += `[👑] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xf77104";
        } else if (stato > 1187) {
          announcement += `[👑] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xf77104";
        } else if (stato > 1000) {
          announcement += `[👑] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xf77104";
        } else if (stato > 850) {
          announcement += `[💎] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x7cd3fa";
        } else if (stato > 700) {
          announcement += `[💎] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x7cd3fa";
        } else if (stato > 560) {
          announcement += `[💎] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x7cd3fa";
        } else if (stato > 460) {
          announcement += `[💎] - [🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x7cd3fa";
        } else if (stato > 380) {
          announcement += `[🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x62AEE3";
        } else if (stato > 320) {
          announcement += `[🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x62AEE3";
        } else if (stato > 260) {
          announcement += `[🪙: ${stato}]  ·${textorank}`;
          chatColor = "0x62AEE3";
        } else if (stato > 200) {
          announcement += `[🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xEAC274";
        } else if (stato > 160) {
          announcement += `[🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xEAC274";
        } else if (stato > 130) {
          announcement += `[🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xEAC274";
        } else if (stato > 90) {
          announcement += `[🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xA2A2A2";
        } else if (stato > 70) {
          announcement += `[🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xA2A2A2";
        } else if (stato > 50) {
          announcement += `[🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xA2A2A2";
        } else if (stato > 30) {
          announcement += `[🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xfb7200";
        } else if (stato > 20) {
          announcement += `[🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xfb7200";
        } else if (stato > 10) {
          announcement += `[🪙: ${stato}]  ·${textorank}`;
          chatColor = "0xfb7200";
        } else {
          announcement += `${textorank}`;
          chatColor = "0xEBEBEB";
        }
        if (stats[Ss.RL] === "vip") {
          announcement = `[🪙: ${stato}] ·「VIP」`;
          chatColor = "0xfed42d";
        }
        if (stats[Ss.RL] === "gay") {
          announcement = `[🇩🇿] ·「GAY」`;
          chatColor = randomColor();
        }
        discord_chat_log(announcement, player, originalMessage);
        announcement += player.name + ": " + originalMessage;
        room.sendAnnouncement(announcement, null, chatColor);
        return false;
      } else {
        let stats = [
          0,
          0,
          0,
          0,
          "0.00",
          0,
          0,
          0,
          0,
          "0.00",
          "player",
          player.name,
          0,
          "none",
        ];
        localStorage.setItem(getAuth(player), JSON.stringify(stats));
        var announcement = "「No rank」";
        chatColor = "0xEBEBEB";
        announcement += player.name + ": " + originalMessage;
        room.sendAnnouncement(announcement, null, chatColor);
        return false;
      }
    };

    var teamIDs = [
      { Index: 0, Name: "Spectators" },
      {
        Index: 1,
        Name: "The match starts at Arena Power, the teams that will face each other today are: ",
      },
      { Index: 2, Name: "         x" },
    ];

    var teams = [];

    function getRandomIntegers(length) {
      var randomInts = [0, 0];
      var numbers = [];
      if (!isNaN(length)) {
        for (var n = 1; n <= length; n++) {
          numbers.push(n);
        }
      }
      for (var i = 0; i < randomInts.length; i++) {
        randomInts[i] = numbers[Math.floor(Math.random() * numbers.length)];
        if (i < randomInts.length - 1) {
          var index = numbers.indexOf(randomInts[i]);
          index !== -1
            ? numbers.splice(index, 1)
            : console.log("Error in deleting random number");
        }
      }
      return randomInts;
    }

    // function randomUniforms() {
    //     var randomInts = getRandomIntegers(teams.length);
    //     var t = [
    //         { int: randomInts[0], teamID: 1 },
    //         { int: randomInts[1], teamID: 2 },
    //     ];
    //     t.forEach((x) => {
    //         var index = teams.findIndex((team) => team.ID == x.int);
    //         var tindex = t.findIndex((o) => o.teamID == x.teamID);
    //         if (index !== -1) {
    //             room.setTeamColors(x.teamID, teams[x.int - 1].uniform[tindex].angle, teams[x.int - 1].uniform[tindex].avatarColor, teams[x.int - 1].uniform[tindex].mainColor);
    //             room.sendAnnouncement(` ${teamIDs[x.teamID].Name}`, null, 0xff0000, "bold");
    //             room.sendAnnouncement(` ${teams[x.int - 1].longName}`, null, 0x05c5ff, "bold");
    //         }
    //     });
    // }

    room.onPlayerActivity = function (player) {
      setActivity(player, 0);
    };

    function curveball() {
      let introl = setInterval(() => {
        let ballPosition = room.getBallPosition();
        let rightgoal = { x: bigMapWidth * 2, y: bigMapHeight / 2 };
        let leftgoal = { x: -bigMapWidth * 2, y: bigMapHeight / 2 };
        let targetGoal = lastTeamTouched == Team.RED ? rightgoal : leftgoal;
        const P0 = { x: ballPosition.x, y: ballPosition.y }; // Starting position
        let p1addin = ballPosition.y > 0 ? -curveAng : curveAng;
        const P1 = { x: (P0.x + targetGoal.x) / 2, y: P0.y + p1addin }; // First control point
        const P2 = { x: (P0.x + targetGoal.x) / 2, y: P0.y - 100 }; // Second control point
        const P3 = { x: targetGoal.x, y: targetGoal.y }; // Target goal position
        let t = 0.00038; // Increment this over time (0 < t <= 1)
        const cubicX =
          Math.pow(1 - t, 3) * P0.x +
          3 * Math.pow(1 - t, 2) * t * P1.x +
          3 * (1 - t) * Math.pow(t, 2) * P2.x +
          Math.pow(t, 3) * P3.x;
        const cubicY =
          Math.pow(1 - t, 3) * P0.y +
          3 * Math.pow(1 - t, 2) * t * P1.y +
          3 * (1 - t) * Math.pow(t, 2) * P2.y +
          Math.pow(t, 3) * P3.y;
        const gravityX = (cubicX - ballPosition.x) * 0.05;
        const gravityY = (cubicY - ballPosition.y) * 0.05;
        room.setDiscProperties(0, { xgravity: gravityX, ygravity: gravityY });
      }, 50);
      let timeo =
        lastTeamTouched == Team.RED
          ? Math.floor((-1500 / 551) * room.getBallPosition().x + 1500)
          : Math.floor((1500 / 551) * room.getBallPosition().x + 1500);
      setTimeout(() => {
        clearInterval(introl);
        room.setDiscProperties(0, { xgravity: 0, ygravity: 0 });
      }, timeo);
    }

    room.onPlayerBallKick = function (player) {
      if (
        lastPlayersTouched[0] == null ||
        player.id != lastPlayersTouched[0].id
      ) {
        !activePlay ? (activePlay = true) : null;
        lastTeamTouched = player.team;
        lastPlayersTouched[1] = lastPlayersTouched[0];
        lastPlayersTouched[0] = player;
      }
      if (curveON) curveball();
    };

    /* GAME MANAGEMENT */

    room.onGameStart = function (_byPlayer) {
      // randomUniforms();
      definvMass = room.getDiscProperties(0).invMass;
      game = new Game(Date.now(), room.getScores(), []);
      countAFK = true;
      activePlay = false;
      goldenGoal = false;
      endGameVariable = false;
      lastPlayersTouched = [null, null];
      Rposs = 0;
      Bposs = 0;
      GKList = [];
      allReds = [];
      allBlues = [];
      room.sendAnnouncement(
        "                                        💬 Discord Link: ➡ https://discord.gg/QMqfcYZYfk ⬅",
        null,
        Cor.Verde,
        Normal
      );
      room.sendAnnouncement(
        "[💬] Use 't' to chat with your team!",
        null,
        0x5ee7ff
      );
      room.sendAnnouncement("The match is being recorded.");
      if (teamR.length == maxTeamSize && teamB.length == maxTeamSize) {
        for (var i = 0; i < maxTeamSize; i++) {
          allReds.push(teamR[i]);
          allBlues.push(teamB[i]);
        }
      }
      for (var i = 0; i < extendedP.length; i++) {
        extendedP[i][eP.GK] = 0;
        extendedP[i][eP.ACT] = 0;
        room.getPlayer(extendedP[i][eP.ID]) == null
          ? extendedP.splice(i, 1)
          : null;
      }
      room.startRecording();
      deactivateChooseMode();
      if (currentMap === "HHL 3V3 by Bnz" && players.length >= maxTeamSize * 2)
        readgameodds(teamR, teamB);
      bettimeout = true;
      setTimeout(() => {
        bettimeout = false;
      }, 21000);
    };

    function readgameodds(redteam, blueteam) {
      let teamScores = { 1: 0, 2: 0 };
      function calculatePlayerStats(player) {
        if (getAuth(player) != null) {
          let stats;
          if (localStorage.getItem(getAuth(player))) {
            stats = JSON.parse(localStorage.getItem(getAuth(player)));
          } else {
            stats = [
              0,
              0,
              0,
              0,
              "0.00",
              0,
              0,
              0,
              0,
              "0.00",
              "player",
              player.name,
              0,
              "none",
            ];
            localStorage.setItem(getAuth(player), JSON.stringify(stats));
          }
          let score = 0;
          for (let weight in betweights) {
            score += stats[weight] * betweights[weight];
          }
          return Math.max(score, 0);
        } else {
          return 0;
        }
      }
      redteam.forEach((player) => {
        teamScores[1] += calculatePlayerStats(player);
      });
      blueteam.forEach((player) => {
        teamScores[2] += calculatePlayerStats(player);
      });
      let totalScore = teamScores[1] + teamScores[2];
      if (totalScore == 0) {
        redodds = 0.5;
        blueodds = 0.5;
      } else {
        redodds = Math.max(0, Math.min(1, teamScores[1] / totalScore));
        blueodds = Math.max(0, Math.min(1, teamScores[2] / totalScore));
      }
      room.sendAnnouncement(
        `Team odds for bets: Red(${redodds.toFixed(
          2
        )}), Blue(${blueodds.toFixed(2)})`,
        null,
        0x73ec59,
        "bold"
      );
    }

    room.onGameStop = function (byPlayer) {
      if (byPlayer.id == 0 && endGameVariable) {
        updateTeams();
        if (inChooseMode) {
          if (players.length == 2 * maxTeamSize) {
            inChooseMode = false;
            resetBtn();
            for (var i = 0; i < maxTeamSize; i++) {
              setTimeout(() => {
                randomBtn();
              }, 400 * i);
            }
            setTimeout(() => {
              room.startGame();
            }, 2000);
          } else {
            if (lastWinner == Team.RED) {
              blueToSpecBtn();
            } else if (lastWinner == Team.BLUE) {
              redToSpecBtn();
              blueToRedBtn();
            } else {
              resetBtn();
            }
            setTimeout(() => {
              topBtn();
            }, 500);
          }
        } else {
          if (players.length == 2) {
            if (lastWinner == Team.BLUE) {
              room.setPlayerTeam(teamB[0].id, Team.RED);
              room.setPlayerTeam(teamR[0].id, Team.BLUE);
            }
            setTimeout(() => {
              room.startGame();
            }, 2000);
          } else if (
            players.length == 3 ||
            players.length >= 2 * maxTeamSize + 1
          ) {
            if (lastWinner == Team.RED) {
              blueToSpecBtn();
            } else {
              redToSpecBtn();
              blueToRedBtn();
            }
            setTimeout(() => {
              topBtn();
            }, 200);
            setTimeout(() => {
              room.startGame();
            }, 2000);
          } else if (players.length == 4) {
            resetBtn();
            setTimeout(() => {
              randomBtn();
              setTimeout(() => {
                randomBtn();
              }, 500);
            }, 500);
            setTimeout(() => {
              room.startGame();
            }, 2000);
          } else if (
            players.length == 5 ||
            players.length >= 2 * maxTeamSize + 1
          ) {
            if (lastWinner == Team.RED) {
              blueToSpecBtn();
            } else {
              redToSpecBtn();
              blueToRedBtn();
            }
            setTimeout(() => {
              topBtn();
            }, 200);
            activateChooseMode();
          } else if (players.length == 6) {
            resetBtn();
            setTimeout(() => {
              randomBtn();
              setTimeout(() => {
                randomBtn();
                setTimeout(() => {
                  randomBtn();
                }, 500);
              }, 500);
            }, 500);
            setTimeout(() => {
              room.startGame();
            }, 2000);
          }
        }
      }
    };

    room.onGamePause = function (_byPlayer) {};

    room.onGameUnpause = function (_byPlayer) {
      if (
        (teamR.length == 4 && teamB.length == 4 && inChooseMode) ||
        (teamR.length == teamB.length && teamS.length < 2 && inChooseMode)
      ) {
        deactivateChooseMode();
      }
    };

    room.onTeamGoal = function (team) {
      curveON = false;
      let goalMaker = lastPlayersTouched[0] ? lastPlayersTouched[0].id : 0;
      let goalName = lastPlayersTouched[0] ? lastPlayersTouched[0].name : "";
      let goalName2 = lastPlayersTouched[1] ? lastPlayersTouched[1].name : null;
      lastPlayersTouched[0] == null
        ? (lastPlayersTouched[0] = playersALL[0])
        : null;
      activePlay = false;
      countAFK = false;
      const scores = room.getScores();
      game.scores = scores;
      if (lastPlayersTouched[0] != null && lastPlayersTouched[0].team == team) {
        updatePhrases(goalName, goalName2);
        if (
          lastPlayersTouched[1] != null &&
          lastPlayersTouched[1].team == team
        ) {
          var frasegol = frasesGOL[(Math.random() * frasesGOL.length) | 0];
          var fraseasis = frasesASS[(Math.random() * frasesASS.length) | 0];
          room.sendAnnouncement(
            "⚽👥 " +
              getTime(scores) +
              frasegol +
              fraseasis +
              " | Kick speed: " +
              ballSpeed.toPrecision(4).toString() +
              "mph " +
              (team == Team.RED ? "🔴" : "🔵"),
            null,
            team == Team.RED ? Cor.Vermelho : Cor.Azul,
            "bold"
          );
          game.goals.push(
            new Goal(
              scores.time,
              team,
              lastPlayersTouched[0],
              lastPlayersTouched[1]
            )
          );
        } else {
          var frasegol = frasesGOL[(Math.random() * frasesGOL.length) | 0];
          room.sendAnnouncement(
            "⚽ " +
              getTime(scores) +
              frasegol +
              " | Kick speed: " +
              ballSpeed.toPrecision(4).toString() +
              "mph " +
              (team == Team.RED ? "🔴" : "🔵"),
            null,
            team == Team.RED ? Cor.Vermelho : Cor.Azul,
            "bold"
          );
          game.goals.push(
            new Goal(scores.time, team, lastPlayersTouched[0], null)
          );
        }
        celebo = true;
        celebPlayer = goalMaker;
        celebTeam = team;
        localStorage.getItem(getAuth(lastPlayersTouched[0]))
          ? (stats = JSON.parse(
              localStorage.getItem(getAuth(lastPlayersTouched[0]))
            ))
          : (stats = [
              0,
              0,
              0,
              0,
              "0.00",
              0,
              0,
              0,
              0,
              "0.00",
              "player",
              lastPlayersTouched[0].name,
              0,
              "none",
            ]);
        celebrat = stats[Ss.CL];
        if (
          lastPlayersTouched[1] != null &&
          lastPlayersTouched[1].team == team
        ) {
          let goalAssist = lastPlayersTouched[1].id;
          setTimeout(function () {
            room.setPlayerAvatar(goalAssist, "🤝");
            setTimeout(function () {
              room.setPlayerAvatar(goalAssist, "👟");
              setTimeout(function () {
                room.setPlayerAvatar(goalAssist, null);
              }, 2500);
            }, 1000);
          }, 1);
        }
        resetPhrases(goalName, goalName2);
      } else {
        updatePhrases(goalName, goalName2);
        var fraseautogol = golcontra[(Math.random() * golcontra.length) | 0];
        room.sendAnnouncement(
          "🤡 " +
            getTime(scores) +
            fraseautogol +
            " | Kick speed: " +
            ballSpeed.toPrecision(4).toString() +
            "mph " +
            (team == Team.RED ? "🔴" : "🔵"),
          null,
          team == Team.RED ? Cor.Vermelho : Cor.Azul,
          "bold"
        );
        game.goals.push(
          new Goal(scores.time, team, lastPlayersTouched[0], "own")
        );
        setTimeout(function () {
          room.setPlayerAvatar(goalMaker, "🤦‍♂️");
          setTimeout(function () {
            room.setPlayerAvatar(goalMaker, "🤡");
            setTimeout(function () {
              room.setPlayerAvatar(goalMaker, null);
            }, 3000);
          }, 1000);
        }, 1);
        resetPhrases(goalName, goalName2);
      }
      if (
        scores.scoreLimit != 0 &&
        (scores.red == scores.scoreLimit ||
          (scores.blue == scores.scoreLimit && scores.blue > 0) ||
          goldenGoal == true)
      ) {
        endGame(team, "Win");
        goldenGoal = false;
        setTimeout(() => {
          room.stopGame();
        }, 1000);
      }
    };

    function getDatehoras() {
      let data = new Date(),
        // dia = data.getDate().toString().padStart(2, "0"),
        // mes = (data.getMonth() + 1).toString().padStart(2, "0"),
        horas = data.getHours().toString().padStart(2, "0"),
        minutos = data.getMinutes().toString().padStart(2, "0");
      return `${horas}:${minutos}`;
    }

    function getDateInfo() {
      let data = new Date(),
        dia = data.getDate().toString().padStart(2, "0"),
        mes = (data.getMonth() + 1).toString().padStart(2, "0"),
        ano = data.getFullYear(),
        horas = data.getHours().toString().padStart(2, "0"),
        minutos = data.getMinutes().toString().padStart(2, "0");
      segundos = data.getSeconds().toString().padStart(2, "0");
      return `${dia}/${mes}/${ano}, at ${horas}:${minutos}:${segundos}`;
    }

    // function dataehora() {
    //     let data = new Date(),
    //         dia = data.getDate().toString().padStart(2, "0"),
    //         mes = (data.getMonth() + 1).toString().padStart(2, "0"),
    //         ano = data.getFullYear(),
    //         horas = data.getHours().toString().padStart(2, "0"),
    //         minutos = data.getMinutes().toString().padStart(2, "0");
    //     segundos = data.getSeconds().toString().padStart(2, "0");
    //     return `${dia}/${mes} de ${ano}, ás ${horas}:${minutos} e ${segundos} seconds`;
    // }

    room.onPositionsReset = function () {
      countAFK = true;
      lastPlayersTouched = [null, null];
      room.setDiscProperties(0, { x: 0, y: 0 });
      definvMass = room.getDiscProperties(0).invMass;
    };

    /* MISCELLANEOUS */

    room.onRoomLink = function (url) {
      console.log(url);
    };

    room.onStadiumChange = function (newStadiumName, _byPlayer) {
      currentMap = newStadiumName;
    };

    room.onGameTick = function () {
      checkTime();
      getLastTouchOfTheBall();
      getStats();
      handleInactivity();
      if (celebo) celebrate(celebPlayer, celebrat);
      if (playertofollowid > 0 && followON) ballfollowplayer();
      if (playertogayid > 0 && gayawayON) ballmovefromgay();
    };
    // if (supersON) powershotactive();
  });
}
export default longScript;

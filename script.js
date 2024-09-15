document.addEventListener('DOMContentLoaded', function() {
    const uidInput = document.getElementById('uid');
    const nameInput = document.getElementById('name');
    const downloadButton = document.getElementById('download');

    downloadButton.style.display = 'none';

    function checkInputs() {
        const uidFilled = uidInput.value.length === 8;
        const nameFilled = nameInput.value.trim() !== '';

        if (uidFilled && nameFilled) {
            downloadButton.style.display = 'inline-block';
        } else {
            downloadButton.style.display = 'none';
        }
    }

    uidInput.addEventListener('input', checkInputs);
    nameInput.addEventListener('input', checkInputs);
});

window.onload = function () {
    class i {
        constructor(i, n) {
            this.TWO_PWR_16_DBL = 65536,
            this.TWO_PWR_32_DBL = this.TWO_PWR_16_DBL * this.TWO_PWR_16_DBL,
            this.TWO_PWR_64_DBL = this.TWO_PWR_32_DBL * this.TWO_PWR_32_DBL,
            this.low = 0 | i,
            this.high = 0 | n
        }
        fromNumber(n) {
            return n < 0 ? this.fromNumber(-n).neg() : new i(n % this.TWO_PWR_32_DBL | 0, n / this.TWO_PWR_32_DBL | 0)
        }
        neg() {
            return new i(~this.low, ~this.high).add(new i(1, 0))
        }
        add(n) {
            var e = this.high >>> 16,
            r = 65535 & this.high,
            a = this.low >>> 16,
            v = 65535 & this.low,
            t = n.high >>> 16,
            o = 65535 & n.high,
            l = n.low >>> 16,
            h = 0,
            s = 0,
            S = 0,
            d = 0;
            return S += (d += v + (65535 & n.low)) >>> 16,
            s += (S += a + l) >>> 16,
            h += (s += r + o) >>> 16,
            h += e + t,
            new i((S &= 65535) << 16 | (d &= 65535), (h &= 65535) << 16 | (s &= 65535))
        }
        shiftLeft(n) {
            return 0 == (n &= 63) ? this : n < 32 ? new i(this.low << n, this.high << n | this.low >>> 32 - n) : new i(0, this.low << n - 32)
        }
        xor(n) {
            return new i(this.low ^ n.low, this.high ^ n.high)
        }
        and(n) {
            return new i(this.low & n.low, this.high & n.high)
        }
        equals(i) {
            return this.high === i.high && this.low === i.low
        }
        toBytesLE() {
            var i = this.high,
            n = this.low;
            return [255 & n, n >>> 8 & 255, n >>> 16 & 255, n >>> 24, 255 & i, i >>> 8 & 255, i >>> 16 & 255, i >>> 24]
        }
        toBytesBE() {
            var i = this.high,
            n = this.low;
            return [i >>> 24, i >>> 16 & 255, i >>> 8 & 255, 255 & i, n >>> 24, n >>> 16 & 255, n >>> 8 & 255, 255 & n]
        }
    }
    var n = [2, 3, 73, 1103, 2017, 560381651, 12868356821];
    function e(e, r) {
        if (0 === r)
            return (new i).fromNumber(n[2] * n[4] * n[5]).toBytesBE().slice(2);
        var a = n[0] * n[0] * n[1] * n[3] * n[6],
        v = new Uint8Array(e.length + 1);
        v.set(e),
        v.set(new Uint8Array([r]), e.length);
        var t = function (n, e) {
            n = (new i).fromNumber(n);
            var r = new i(2850698899, 1123082731),
            a = new i(0, 32768),
            v = new i(4294967295, 65535);
            for (let o = 0; o < e.length; o++) {
                var t = (new i).fromNumber(e[o]).shiftLeft(40);
                n = n.xor(t);
                for (let i = 0; i < 8; i++)
                    n = (n = n.and(a).equals(a) ? (n = n.shiftLeft(1)).xor(r) : n.shiftLeft(1)).and(v)
            }
            return n
        }
        (a, v);
        return t.toBytesLE().slice(0, 6)
    }
    function r(i, n) {
        return new RegExp("[0-9A-Fa-f]{" + n + "}").test(i)
    }
    function a(n, r, a) {
        var v = new Uint8Array(1024);
        v[0] = n[0],
        v[1] = n[1],
        v[2] = n[2],
        v[3] = n[3],
        v[4] = function (i) {
            let n = 0;
            if (i && i.length > 0)
                for (let e = 0; e < i.length; e++)
                    n ^= i[e];
            return n
        }
        (n),
        v[5] = 129,
        v[6] = 1,
        v[7] = 15,
        v[17] = r[0],
        v[16] = r[1],
        v[29] = a[0],
        v[28] = a[1];
        var t = function (i) {
            let n = 65535;
            for (let e = 0; e < 30; e++) {
                let r = i[e];
                for (let i = 0; i < 8; i++) {
                    const e = 1 == (n >> 15 & 1);
                    n <<= 1,
                    e ^ 1 == (r >> 7 - i & 1) && (n ^= 4129)
                }
            }
            n &= 65535;
            var e = new Uint8Array(2);
            return e[0] = 255 & n,
            e[1] = n >> 8 & 255,
            e
        }
        (v);
        v[30] = t[0],
        v[31] = t[1];
        var o = 0;
        for (let r = 48; r < v.length; r += 64) {
            let a = e(n, o);
            for (let i = 0; i < a.length; i++)
                v[r + i] = a[i];
            let t = (new i).fromNumber(0 === o ? 4278681705 : 2131691625).toBytesBE().slice(4);
            for (let i = 0; i < t.length; i++)
                v[r + 6 + i] = t[i];
            o++
        }
        return v
    }
    var v = document.getElementById("data");
    [{
            i: 3426,
            v: 16640,
            n: "Astroblast"
        }, {
            i: 3426,
            v: 17667,
            n: "Astroblast (Legendary)"
        }, {
            i: 540,
            v: 13314,
            n: "Barkley (Gnarly) (Mini)"
        }, {
            i: 540,
            v: 12288,
            n: "Barkley (Mini)"
        }, {
            i: 540,
            v: 4096,
            n: "Barkley (Sidekick)"
        }, {
            i: 4,
            v: 0,
            n: "Bash"
        }, {
            i: 404,
            v: 0,
            n: "Bash (Legendary)"
        }, {
            i: 4,
            v: 6145,
            n: "Bash (S2)"
        }, {
            i: 480,
            v: 12288,
            n: "Bat Spin"
        }, {
            i: 3420,
            v: 16640,
            n: "Big Bubble Pop Fizz"
        }, {
            i: 485,
            v: 12288,
            n: "Blackout"
        }, {
            i: 453,
            v: 12288,
            n: "Blades"
        }, {
            i: 453,
            v: 13315,
            n: "Blades (Legendary)"
        }, {
            i: 1004,
            v: 9218,
            n: "Blast Zone (Dark) (SFB)"
        }, {
            i: 2004,
            v: 9218,
            n: "Blast Zone (Dark) (SFT)"
        }, {
            i: 1004,
            v: 8192,
            n: "Blast Zone (SFB)"
        }, {
            i: 2004,
            v: 8192,
            n: "Blast Zone (SFT)"
        }, {
            i: 466,
            v: 12288,
            n: "Blastermind (TM)"
        }, {
            i: 1e3,
            v: 8192,
            n: "Boom Jet (SFB)"
        }, {
            i: 2e3,
            v: 8192,
            n: "Boom Jet (SFT)"
        }, {
            i: 22,
            v: 0,
            n: "Boomer"
        }, {
            i: 22,
            v: 18448,
            n: "Boomer (Eon's Elite)"
        }, {
            i: 502,
            v: 12288,
            n: "Bop (Mini)"
        }, {
            i: 110,
            v: 4614,
            n: "Bouncer (G)"
        }, {
            i: 110,
            v: 5635,
            n: "Bouncer (Legendary) (G)"
        }, {
            i: 3424,
            v: 17666,
            n: "Bowser (Dark Hammer Slam)"
        }, {
            i: 3424,
            v: 16640,
            n: "Bowser (Hammer Slam)"
        }, {
            i: 506,
            v: 12288,
            n: "Breeze (Mini)"
        }, {
            i: 3006,
            v: 8192,
            n: "Bumble Blast"
        }, {
            i: 3006,
            v: 9218,
            n: "Bumble Blast (Jolly)"
        }, {
            i: 3006,
            v: 8710,
            n: "Bumble Blast (LC)"
        }, {
            i: 474,
            v: 13315,
            n: "Bushwhack (Legendary) (TM)"
        }, {
            i: 474,
            v: 12288,
            n: "Bushwhack (TM)"
        }, {
            i: 24,
            v: 0,
            n: "Camo"
        }, {
            i: 24,
            v: 10245,
            n: "Camo (Thorn Horn)"
        }, {
            i: 106,
            v: 4096,
            n: "Chill"
        }, {
            i: 106,
            v: 10245,
            n: "Chill (Blizzard)"
        }, {
            i: 106,
            v: 4614,
            n: "Chill (LC)"
        }, {
            i: 106,
            v: 5635,
            n: "Chill (Legendary)"
        }, {
            i: 30,
            v: 0,
            n: "Chop Chop"
        }, {
            i: 30,
            v: 14352,
            n: "Chop Chop (Eon's Elite)"
        }, {
            i: 30,
            v: 10262,
            n: "Chop Chop (Green Twin Blade)"
        }, {
            i: 430,
            v: 0,
            n: "Chop Chop (Legendary)"
        }, {
            i: 30,
            v: 6145,
            n: "Chop Chop (S2)"
        }, {
            i: 30,
            v: 10245,
            n: "Chop Chop (Twin Blade)"
        }, {
            i: 472,
            v: 12288,
            n: "Chopper"
        }, {
            i: 469,
            v: 12288,
            n: "Cobra Cadabra"
        }, {
            i: 469,
            v: 13314,
            n: "Cobra Cadabra (King)"
        }, {
            i: 3010,
            v: 8192,
            n: "Countdown"
        }, {
            i: 3010,
            v: 9218,
            n: "Countdown (Kickoff)"
        }, {
            i: 3010,
            v: 8710,
            n: "Countdown (LC)"
        }, {
            i: 102,
            v: 4614,
            n: "Crusher (G)"
        }, {
            i: 682,
            v: 39321,
            n: "Crystal - Air Acorn ???"
        }, {
            i: 682,
            v: 20994,
            n: "Crystal - Air Angel"
        }, {
            i: 682,
            v: 20999,
            n: "Crystal - Air Lantern"
        }, {
            i: 688,
            v: 20998,
            n: "Crystal - Dark Pyramid"
        }, {
            i: 688,
            v: 21006,
            n: "Crystal - Dark Reactor"
        }, {
            i: 688,
            v: 9999,
            n: "Crystal - Dark Rune ???"
        }, {
            i: 686,
            v: 21011,
            n: "Crystal - Earth Armor"
        }, {
            i: 686,
            v: 21021,
            n: "Crystal - Earth Rocket"
        }, {
            i: 686,
            v: 39321,
            n: "Crystal - Earth Rune ???"
        }, {
            i: 685,
            v: 21009,
            n: "Crystal - Fire Acorn"
        }, {
            i: 685,
            v: 39321,
            n: "Crystal - Fire Angel ???"
        }, {
            i: 685,
            v: 21007,
            n: "Crystal - Fire Reactor"
        }, {
            i: 687,
            v: 21008,
            n: "Crystal - Life Acorn"
        }, {
            i: 687,
            v: 22032,
            n: "Crystal - Life Acorn (Legendary)"
        }, {
            i: 687,
            v: 21018,
            n: "Crystal - Life Claw"
        }, {
            i: 687,
            v: 21022,
            n: "Crystal - Life Rocket"
        }, {
            i: 687,
            v: 21023,
            n: "Crystal - Life Rune"
        }, {
            i: 689,
            v: 39321,
            n: "Crystal - Light Angel ???"
        }, {
            i: 689,
            v: 21014,
            n: "Crystal - Light Fanged"
        }, {
            i: 689,
            v: 22038,
            n: "Crystal - Light Fanged (Legendary)"
        }, {
            i: 689,
            v: 21003,
            n: "Crystal - Light Rune"
        }, {
            i: 680,
            v: 21019,
            n: "Crystal - Magic Claw"
        }, {
            i: 680,
            v: 21e3,
            n: "Crystal - Magic Lantern"
        }, {
            i: 680,
            v: 22024,
            n: "Crystal - Magic Lantern (Legendary)"
        }, {
            i: 680,
            v: 20996,
            n: "Crystal - Magic Pyramid"
        }, {
            i: 684,
            v: 21013,
            n: "Crystal - Tech Armor"
        }, {
            i: 684,
            v: 39321,
            n: "Crystal - Tech Pyramid ???"
        }, {
            i: 684,
            v: 21005,
            n: "Crystal - Tech Reactor"
        }, {
            i: 683,
            v: 21017,
            n: "Crystal - Undead Claw"
        }, {
            i: 683,
            v: 21015,
            n: "Crystal - Undead Fanged"
        }, {
            i: 683,
            v: 21001,
            n: "Crystal - Undead Lantern"
        }, {
            i: 681,
            v: 21012,
            n: "Crystal - Water Armor"
        }, {
            i: 681,
            v: 21016,
            n: "Crystal - Water Fanged"
        }, {
            i: 681,
            v: 21020,
            n: "Crystal - Water Rocket"
        }, {
            i: 32,
            v: 0,
            n: "Cynder"
        }, {
            i: 32,
            v: 12317,
            n: "Cynder (Clear)"
        }, {
            i: 32,
            v: 6161,
            n: "Cynder (GITD)"
        }, {
            i: 32,
            v: 10245,
            n: "Cynder (Phantom)"
        }, {
            i: 32,
            v: 6145,
            n: "Cynder (S2)"
        }, {
            i: 468,
            v: 12288,
            n: "Deja Vu"
        }, {
            i: 468,
            v: 13315,
            n: "Deja Vu (Legendary)"
        }, {
            i: 6,
            v: 0,
            n: "Dino-Rang"
        }, {
            i: 6,
            v: 18448,
            n: "Dino-Rang (Eon's Elite)"
        }, {
            i: 3425,
            v: 16640,
            n: "Dive-Clops"
        }, {
            i: 3425,
            v: 17678,
            n: "Dive-Clops (Missile-Tow)"
        }, {
            i: 3423,
            v: 17666,
            n: "Donkey Kong (Dark Turbo Charge)"
        }, {
            i: 3423,
            v: 16640,
            n: "Donkey Kong (Turbo Charge)"
        }, {
            i: 1003,
            v: 8192,
            n: "Doom Stone (SFB)"
        }, {
            i: 2003,
            v: 8192,
            n: "Doom Stone (SFT)"
        }, {
            i: 18,
            v: 0,
            n: "Double Trouble"
        }, {
            i: 18,
            v: 7170,
            n: "Double Trouble (Royal)"
        }, {
            i: 18,
            v: 6145,
            n: "Double Trouble (S2)"
        }, {
            i: 21,
            v: 0,
            n: "Drill Sergeant"
        }, {
            i: 21,
            v: 6145,
            n: "Drill Sergeant (S2)"
        }, {
            i: 510,
            v: 12288,
            n: "Drobit (Mini)"
        }, {
            i: 20,
            v: 0,
            n: "Drobot"
        }, {
            i: 20,
            v: 4614,
            n: "Drobot (LC)"
        }, {
            i: 20,
            v: 6145,
            n: "Drobot (S2)"
        }, {
            i: 3008,
            v: 8192,
            n: "Dune Bug"
        }, {
            i: 465,
            v: 12288,
            n: "Echo"
        }, {
            i: 467,
            v: 12288,
            n: "Enigma (TM)"
        }, {
            i: 9,
            v: 0,
            n: "Eruptor"
        }, {
            i: 9,
            v: 14352,
            n: "Eruptor (Eon's Elite)"
        }, {
            i: 9,
            v: 4614,
            n: "Eruptor (LC)"
        }, {
            i: 9,
            v: 10245,
            n: "Eruptor (Lava Barf)"
        }, {
            i: 3421,
            v: 16640,
            n: "Eruptor (Lava Lance)"
        }, {
            i: 9,
            v: 6145,
            n: "Eruptor (S2)"
        }, {
            i: 9,
            v: 11266,
            n: "Eruptor (Volcanic)"
        }, {
            i: 114,
            v: 4614,
            n: "Eye-Brawl (G)"
        }, {
            i: 114,
            v: 4629,
            n: "Eye-Brawl (Pumpkin) (G)"
        }, {
            i: 543,
            v: 12288,
            n: "Eye-Small (Mini)"
        }, {
            i: 543,
            v: 4096,
            n: "Eye-Small (Sidekick)"
        }, {
            i: 3400,
            v: 16640,
            n: "Fiesta"
        }, {
            i: 3400,
            v: 17685,
            n: "Fiesta (Frightful)"
        }, {
            i: 1005,
            v: 9218,
            n: "Fire Kraken (Jade) (SFB)"
        }, {
            i: 2005,
            v: 9218,
            n: "Fire Kraken (Jade) (SFT)"
        }, {
            i: 1005,
            v: 8192,
            n: "Fire Kraken (SFB)"
        }, {
            i: 2005,
            v: 8192,
            n: "Fire Kraken (SFT)"
        }, {
            i: 456,
            v: 12288,
            n: "Fist Bump"
        }, {
            i: 11,
            v: 0,
            n: "Flameslinger"
        }, {
            i: 11,
            v: 6146,
            n: "Flameslinger (Golden)"
        }, {
            i: 11,
            v: 6145,
            n: "Flameslinger (S2)"
        }, {
            i: 103,
            v: 4096,
            n: "Flashwing"
        }, {
            i: 103,
            v: 5122,
            n: "Flashwing (Jade)"
        }, {
            i: 103,
            v: 8710,
            n: "Flashwing (LC)"
        }, {
            i: 452,
            v: 12288,
            n: "Fling Kong"
        }, {
            i: 464,
            v: 12288,
            n: "Flip Wreck"
        }, {
            i: 476,
            v: 12288,
            n: "Food Fight"
        }, {
            i: 476,
            v: 13314,
            n: "Food Fight (Dark)"
        }, {
            i: 1001,
            v: 9219,
            n: "Free Ranger (Legendary) (SFB)"
        }, {
            i: 2001,
            v: 9219,
            n: "Free Ranger (Legendary) (SFT)"
        }, {
            i: 1001,
            v: 8192,
            n: "Free Ranger (SFB)"
        }, {
            i: 2001,
            v: 8192,
            n: "Free Ranger (SFT)"
        }, {
            i: 1014,
            v: 9218,
            n: "Freeze Blade (Nitro) (SFB)"
        }, {
            i: 2014,
            v: 9218,
            n: "Freeze Blade (Nitro) (SFT)"
        }, {
            i: 1014,
            v: 8192,
            n: "Freeze Blade (SFB)"
        }, {
            i: 2014,
            v: 8192,
            n: "Freeze Blade (SFT)"
        }, {
            i: 115,
            v: 4096,
            n: "Fright Rider"
        }, {
            i: 115,
            v: 4113,
            n: "Fright Rider (GITD)"
        }, {
            i: 115,
            v: 4117,
            n: "Fright Rider (Halloween)"
        }, {
            i: 3004,
            v: 8192,
            n: "Fryno"
        }, {
            i: 3004,
            v: 14337,
            n: "Fryno (Hog Wild)"
        }, {
            i: 481,
            v: 12288,
            n: "Funny Bone"
        }, {
            i: 471,
            v: 12288,
            n: "Gearshift (TM)"
        }, {
            i: 31,
            v: 0,
            n: "Ghost Roaster"
        }, {
            i: 31,
            v: 18448,
            n: "Ghost Roaster (Eon's Elite)"
        }, {
            i: 14,
            v: 0,
            n: "Gill Grunt"
        }, {
            i: 14,
            v: 10245,
            n: "Gill Grunt (Anchors Away)"
        }, {
            i: 3422,
            v: 16640,
            n: "Gill Grunt (Deep Dive)"
        }, {
            i: 14,
            v: 14352,
            n: "Gill Grunt (Eon's Elite)"
        }, {
            i: 14,
            v: 6167,
            n: "Gill Grunt (Metallic)"
        }, {
            i: 14,
            v: 6145,
            n: "Gill Grunt (S2)"
        }, {
            i: 14,
            v: 14345,
            n: "Gill Grunt (Tidal Wave)"
        }, {
            i: 514,
            v: 12288,
            n: "Gill Runt (Mini)"
        }, {
            i: 514,
            v: 0,
            n: "Gill Runt (Sidekick)"
        }, {
            i: 699,
            v: 21e3,
            n: "Goldie (Invincible)"
        }, {
            i: 102,
            v: 5634,
            n: "Granite Crusher (G)"
        }, {
            i: 1007,
            v: 8192,
            n: "Grilla Drilla (SFB)"
        }, {
            i: 2007,
            v: 8192,
            n: "Grilla Drilla (SFT)"
        }, {
            i: 3013,
            v: 8192,
            n: "Grim Creeper"
        }, {
            i: 3013,
            v: 8710,
            n: "Grim Creeper (LC)"
        }, {
            i: 3013,
            v: 9731,
            n: "Grim Creeper (Legendary) (LC)"
        }, {
            i: 450,
            v: 12288,
            n: "Gusto (TM)"
        }, {
            i: 455,
            v: 13314,
            n: "Head Rush (Nitro)"
        }, {
            i: 455,
            v: 12288,
            n: "Head Rush (TM)"
        }, {
            i: 29,
            v: 0,
            n: "Hex"
        }, {
            i: 29,
            v: 4614,
            n: "Hex (LC)"
        }, {
            i: 29,
            v: 6145,
            n: "Hex (S2)"
        }, {
            i: 477,
            v: 12288,
            n: "High Five"
        }, {
            i: 3401,
            v: 16640,
            n: "High Volt"
        }, {
            i: 504,
            v: 12288,
            n: "Hijinx (Mini)"
        }, {
            i: 1008,
            v: 9218,
            n: "Hoot Loop (Enchanted) (SFB)"
        }, {
            i: 2008,
            v: 9218,
            n: "Hoot Loop (Enchanted) (SFT)"
        }, {
            i: 1008,
            v: 8192,
            n: "Hoot Loop (SFB)"
        }, {
            i: 2008,
            v: 8192,
            n: "Hoot Loop (SFT)"
        }, {
            i: 105,
            v: 4096,
            n: "Hot Dog"
        }, {
            i: 105,
            v: 10245,
            n: "Hot Dog (Fire Bone)"
        }, {
            i: 105,
            v: 5122,
            n: "Hot Dog (Molten)"
        }, {
            i: 104,
            v: 4614,
            n: "Hot Head (G)"
        }, {
            i: 104,
            v: 4627,
            n: "Hot Head (Sparkle)"
        }, {
            i: 10,
            v: 0,
            n: "Ignitor"
        }, {
            i: 10,
            v: 7171,
            n: "Ignitor (Legendary)"
        }, {
            i: 10,
            v: 6145,
            n: "Ignitor (S2)"
        }, {
            i: 200,
            v: 8192,
            n: "Item - Anvil Rain"
        }, {
            i: 3303,
            v: 8710,
            n: "Item - Arkeyan Crossbow"
        }, {
            i: 3200,
            v: 8192,
            n: "Item - Battle Hammer"
        }, {
            i: 235,
            v: 20503,
            n: "Item - Cursed Tiki Temple"
        }, {
            i: 303,
            v: 8192,
            n: "Item - Darklight Crypt"
        }, {
            i: 300,
            v: 0,
            n: "Item - Dragon's Peak"
        }, {
            i: 208,
            v: 4614,
            n: "Item - Dragonfire Cannon"
        }, {
            i: 301,
            v: 8192,
            n: "Item - Empire Of Ice"
        }, {
            i: 311,
            v: 20480,
            n: "Item - Enchanted Elven Forest"
        }, {
            i: 3302,
            v: 8710,
            n: "Item - Fiery Forge"
        }, {
            i: 203,
            v: 8192,
            n: "Item - Ghost Pirate Swords"
        }, {
            i: 208,
            v: 5634,
            n: "Item - Golden Dragonfire Cannon"
        }, {
            i: 3203,
            v: 8192,
            n: "Item - Groove Machine"
        }, {
            i: 310,
            v: 20480,
            n: "Item - Gryphon Park Observatory"
        }, {
            i: 230,
            v: 0,
            n: "Item - Hand Of Fate"
        }, {
            i: 230,
            v: 13315,
            n: "Item - Hand Of Fate (Legendary)"
        }, {
            i: 202,
            v: 8192,
            n: "Item - Healing Elixer"
        }, {
            i: 201,
            v: 8192,
            n: "Item - Hidden Treasure"
        }, {
            i: 235,
            v: 20505,
            n: "Item - Lost Imaginite Mines"
        }, {
            i: 308,
            v: 12806,
            n: "Item - Midnight Museum"
        }, {
            i: 305,
            v: 12288,
            n: "Item - Mirror Of Mystery"
        }, {
            i: 235,
            v: 20481,
            n: "Item - Mystery Chest (Bronze)"
        }, {
            i: 235,
            v: 20483,
            n: "Item - Mystery Chest (Gold)"
        }, {
            i: 235,
            v: 20482,
            n: "Item - Mystery Chest (Silver)"
        }, {
            i: 306,
            v: 12288,
            n: "Item - Nightmare Express"
        }, {
            i: 231,
            v: 0,
            n: "Item - Piggy Bank"
        }, {
            i: 302,
            v: 8192,
            n: "Item - Pirate Ship"
        }, {
            i: 3202,
            v: 8192,
            n: "Item - Platinum Sheep"
        }, {
            i: 232,
            v: 0,
            n: "Item - Rocket Ram"
        }, {
            i: 209,
            v: 4614,
            n: "Item - Scorpion Striker Catapult"
        }, {
            i: 3300,
            v: 8192,
            n: "Item - Sheep Wreck Island"
        }, {
            i: 3201,
            v: 8192,
            n: "Item - Sky Diamond"
        }, {
            i: 205,
            v: 8192,
            n: "Item - Sky-Iron Shield"
        }, {
            i: 207,
            v: 8192,
            n: "Item - Sparx Dragonfly"
        }, {
            i: 307,
            v: 12806,
            n: "Item - Sunscraper Spire"
        }, {
            i: 233,
            v: 0,
            n: "Item - Tiki Speaky"
        }, {
            i: 204,
            v: 8192,
            n: "Item - Time Twister Hourglass"
        }, {
            i: 3301,
            v: 8192,
            n: "Item - Tower Of Time"
        }, {
            i: 3204,
            v: 8192,
            n: "Item - Ufo Hat"
        }, {
            i: 304,
            v: 8192,
            n: "Item - Volcanic Vault"
        }, {
            i: 206,
            v: 8192,
            n: "Item - Winged Boots"
        }, {
            i: 470,
            v: 13315,
            n: "Jawbreaker (Legendary) (TM)"
        }, {
            i: 470,
            v: 12288,
            n: "Jawbreaker (TM)"
        }, {
            i: 100,
            v: 10245,
            n: "Jet Vac (Turbo)"
        }, {
            i: 100,
            v: 4096,
            n: "Jet-Vac"
        }, {
            i: 100,
            v: 14341,
            n: "Jet-Vac (Full Blast)"
        }, {
            i: 3413,
            v: 16640,
            n: "Jet-Vac (Hurricane)"
        }, {
            i: 100,
            v: 4614,
            n: "Jet-Vac (LC)"
        }, {
            i: 3413,
            v: 17667,
            n: "Jet-Vac (Legendary Hurricane)"
        }, {
            i: 100,
            v: 5123,
            n: "Jet-Vac (Legendary)"
        }, {
            i: 459,
            v: 12288,
            n: "Kaboom (TM)"
        }, {
            i: 3503,
            v: 16384,
            n: "Kaos Trophy"
        }, {
            i: 482,
            v: 12288,
            n: "Knight Light (TM)"
        }, {
            i: 484,
            v: 12288,
            n: "Knight Mare (TM)"
        }, {
            i: 478,
            v: 13314,
            n: "Krypt King (Nitro) (TM)"
        }, {
            i: 478,
            v: 12288,
            n: "Krypt King (TM)"
        }, {
            i: 3501,
            v: 16384,
            n: "Land Trophy"
        }, {
            i: 3,
            v: 0,
            n: "Lightning Rod"
        }, {
            i: 3,
            v: 6145,
            n: "Lightning Rod (S2)"
        }, {
            i: 463,
            v: 12288,
            n: "Lob Star (TM)"
        }, {
            i: 463,
            v: 13314,
            n: "Lob Star (Winterfest) (TM)"
        }, {
            i: 1010,
            v: 9218,
            n: "Magna Charge (Nitro) (SFB)"
        }, {
            i: 2010,
            v: 9218,
            n: "Magna Charge (Nitro) (SFT)"
        }, {
            i: 1010,
            v: 8192,
            n: "Magna Charge (SFB)"
        }, {
            i: 2010,
            v: 8192,
            n: "Magna Charge (SFT)"
        }, {
            i: 542,
            v: 12288,
            n: "Mini Jini (Mini)"
        }, {
            i: 542,
            v: 4096,
            n: "Mini Jini (Sidekick)"
        }, {
            i: 1012,
            v: 9219,
            n: "Night Shift (Legendary) (SFB)"
        }, {
            i: 2012,
            v: 9219,
            n: "Night Shift (Legendary) (SFT)"
        }, {
            i: 1012,
            v: 8192,
            n: "Night Shift (SFB)"
        }, {
            i: 2012,
            v: 8192,
            n: "Night Shift (SFT)"
        }, {
            i: 3427,
            v: 16640,
            n: "Nightfall"
        }, {
            i: 109,
            v: 4614,
            n: "Ninjini (G)"
        }, {
            i: 109,
            v: 5634,
            n: "Ninjini (Scarlet) (G)"
        }, {
            i: 508,
            v: 12288,
            n: "Pet Vac (Mini)"
        }, {
            i: 508,
            v: 13314,
            n: "Pet Vac (Power Punch) (Mini)"
        }, {
            i: 108,
            v: 4096,
            n: "Pop Fizz"
        }, {
            i: 3420,
            v: 17678,
            n: "Pop Fizz (Birthday Bash Big Bubble)"
        }, {
            i: 108,
            v: 14341,
            n: "Pop Fizz (Fizzy Frenzy)"
        }, {
            i: 108,
            v: 4614,
            n: "Pop Fizz (LC)"
        }, {
            i: 108,
            v: 15362,
            n: "Pop Fizz (Love Potion)"
        }, {
            i: 108,
            v: 5122,
            n: "Pop Fizz (Punch)"
        }, {
            i: 108,
            v: 10245,
            n: "Pop Fizz (Super Gulp)"
        }, {
            i: 3001,
            v: 8192,
            n: "Pop Thorn"
        }, {
            i: 7,
            v: 0,
            n: "Prism Break"
        }, {
            i: 7,
            v: 10245,
            n: "Prism Break (Hyper Beam)"
        }, {
            i: 7,
            v: 4614,
            n: "Prism Break (LC)"
        }, {
            i: 7,
            v: 6145,
            n: "Prism Break (S2)"
        }, {
            i: 3015,
            v: 8192,
            n: "Punk Shock"
        }, {
            i: 1013,
            v: 9218,
            n: "Rattle Shake (Quickdraw) (SFB)"
        }, {
            i: 2013,
            v: 9218,
            n: "Rattle Shake (Quickdraw) (SFT)"
        }, {
            i: 1013,
            v: 8192,
            n: "Rattle Shake (SFB)"
        }, {
            i: 2013,
            v: 8192,
            n: "Rattle Shake (SFT)"
        }, {
            i: 3014,
            v: 8192,
            n: "Rip Tide"
        }, {
            i: 457,
            v: 12288,
            n: "Rocky Roll"
        }, {
            i: 3012,
            v: 8192,
            n: "Roller Brawl"
        }, {
            i: 3417,
            v: 16640,
            n: "Roller Brawl (Bone Bash)"
        }, {
            i: 3417,
            v: 17667,
            n: "Roller Brawl (Legendary Bone Bash)"
        }, {
            i: 1002,
            v: 8192,
            n: "Rubble Rouser (SFB)"
        }, {
            i: 2002,
            v: 8192,
            n: "Rubble Rouser (SFT)"
        }, {
            i: 3003,
            v: 8192,
            n: "Scorp"
        }, {
            i: 3e3,
            v: 8192,
            n: "Scratch"
        }, {
            i: 3502,
            v: 16384,
            n: "Sea Trophy"
        }, {
            i: 607,
            v: 20480,
            n: "Sensei - Air Strike"
        }, {
            i: 607,
            v: 21517,
            n: "Sensei - Air Strike (Egg Bomber)"
        }, {
            i: 609,
            v: 20480,
            n: "Sensei - Ambush"
        }, {
            i: 619,
            v: 20480,
            n: "Sensei - Aurora"
        }, {
            i: 619,
            v: 21506,
            n: "Sensei - Aurora (Solar Flare)"
        }, {
            i: 606,
            v: 20480,
            n: "Sensei - Barbella"
        }, {
            i: 606,
            v: 20513,
            n: "Sensei - Barbella (Pink)"
        }, {
            i: 604,
            v: 20480,
            n: "Sensei - Boom Bloom"
        }, {
            i: 618,
            v: 20480,
            n: "Sensei - Buckshot"
        }, {
            i: 618,
            v: 21516,
            n: "Sensei - Buckshot (Heart-breaker)"
        }, {
            i: 626,
            v: 20480,
            n: "Sensei - Chain Reaction"
        }, {
            i: 626,
            v: 20513,
            n: "Sensei - Chain Reaction (Orange)"
        }, {
            i: 603,
            v: 20480,
            n: "Sensei - Chopscotch"
        }, {
            i: 603,
            v: 21525,
            n: "Sensei - Chopscotch (Candy-Coated)"
        }, {
            i: 630,
            v: 20480,
            n: "Sensei - Crash Bandicoot"
        }, {
            i: 631,
            v: 20480,
            n: "Sensei - Dr. Neo Cortex"
        }, {
            i: 608,
            v: 20480,
            n: "Sensei - Ember"
        }, {
            i: 608,
            v: 20484,
            n: "Sensei - Ember (Christmas)"
        }, {
            i: 620,
            v: 20480,
            n: "Sensei - Flare Wolf"
        }, {
            i: 620,
            v: 21517,
            n: "Sensei - Flare Wolf (Hard-Boiled)"
        }, {
            i: 601,
            v: 20480,
            n: "Sensei - King Pen"
        }, {
            i: 601,
            v: 21506,
            n: "Sensei - King Pen (Dark)"
        }, {
            i: 616,
            v: 20480,
            n: "Sensei - Mysticat"
        }, {
            i: 605,
            v: 20480,
            n: "Sensei - Pit Boss"
        }, {
            i: 605,
            v: 21507,
            n: "Sensei - Pit Boss (Legendary)"
        }, {
            i: 625,
            v: 20480,
            n: "Sensei - Ro-Bow"
        }, {
            i: 617,
            v: 20480,
            n: "Sensei - Starcast"
        }, {
            i: 617,
            v: 20513,
            n: "Sensei - Starcast (Clear)"
        }, {
            i: 629,
            v: 20480,
            n: "Sensei - Tidepool"
        }, {
            i: 602,
            v: 20480,
            n: "Sensei - Tri-Tip"
        }, {
            i: 602,
            v: 21507,
            n: "Sensei - Tri-Tip (Legendary)"
        }, {
            i: 628,
            v: 20480,
            n: "Sensei - Wild Storm"
        }, {
            i: 479,
            v: 12288,
            n: "Short Cut (TM)"
        }, {
            i: 113,
            v: 4096,
            n: "Shroomboom"
        }, {
            i: 113,
            v: 4614,
            n: "Shroomboom  (LC)"
        }, {
            i: 113,
            v: 14337,
            n: "Shroomboom (Sure Shot)"
        }, {
            i: 3500,
            v: 16384,
            n: "Sky Trophy"
        }, {
            i: 15,
            v: 0,
            n: "Slam Bam"
        }, {
            i: 15,
            v: 14352,
            n: "Slam Bam (Eon's Elite)"
        }, {
            i: 15,
            v: 7171,
            n: "Slam Bam (Legendary)"
        }, {
            i: 15,
            v: 6145,
            n: "Slam Bam (S2)"
        }, {
            i: 3002,
            v: 8192,
            n: "Slobber Tooth"
        }, {
            i: 3002,
            v: 9218,
            n: "Slobber Tooth (Dark)"
        }, {
            i: 509,
            v: 12288,
            n: "Small Fry (Mini)"
        }, {
            i: 3411,
            v: 16640,
            n: "Smash Hit"
        }, {
            i: 3411,
            v: 17666,
            n: "Smash Hit (Steel Plated)"
        }, {
            i: 3005,
            v: 8192,
            n: "Smolderdash"
        }, {
            i: 3005,
            v: 8710,
            n: "Smolderdash (LC)"
        }, {
            i: 462,
            v: 13314,
            n: "Snap Shot (Dark) (TM)"
        }, {
            i: 462,
            v: 12288,
            n: "Snap Shot (TM)"
        }, {
            i: 1,
            v: 0,
            n: "Sonic Boom"
        }, {
            i: 1,
            v: 6161,
            n: "Sonic Boom (GITD)"
        }, {
            i: 1,
            v: 6145,
            n: "Sonic Boom (S2)"
        }, {
            i: 1,
            v: 6163,
            n: "Sonic Boom (Sparkle)"
        }, {
            i: 3412,
            v: 16640,
            n: "Spitfire"
        }, {
            i: 3412,
            v: 17666,
            n: "Spitfire (Dark)"
        }, {
            i: 3402,
            v: 16640,
            n: "Splat"
        }, {
            i: 3402,
            v: 17666,
            n: "Splat (Power Blue)"
        }, {
            i: 483,
            v: 12288,
            n: "Spot Light"
        }, {
            i: 111,
            v: 4096,
            n: "Sprocket"
        }, {
            i: 111,
            v: 10245,
            n: "Sprocket (Heavy Duty)"
        }, {
            i: 111,
            v: 10265,
            n: "Sprocket (Heavy Metal)"
        }, {
            i: 503,
            v: 12288,
            n: "Spry (Mini)"
        }, {
            i: 1011,
            v: 8192,
            n: "Spy Rise (SFB)"
        }, {
            i: 2011,
            v: 8192,
            n: "Spy Rise (SFT)"
        }, {
            i: 16,
            v: 0,
            n: "Spyro"
        }, {
            i: 16,
            v: 11266,
            n: "Spyro (Dark Mega Ram)"
        }, {
            i: 28,
            v: 0,
            n: "Spyro (Dark)"
        }, {
            i: 16,
            v: 14352,
            n: "Spyro (Eon's Elite)"
        }, {
            i: 416,
            v: 0,
            n: "Spyro (Legendary)"
        }, {
            i: 16,
            v: 10245,
            n: "Spyro (Mega Ram)"
        }, {
            i: 16,
            v: 6145,
            n: "Spyro (S2)"
        }, {
            i: 3009,
            v: 8192,
            n: "Star Strike"
        }, {
            i: 3009,
            v: 9730,
            n: "Star Strike (LC Enchanted)"
        }, {
            i: 3009,
            v: 8710,
            n: "Star Strike (LC)"
        }, {
            i: 26,
            v: 0,
            n: "Stealth Elf"
        }, {
            i: 3415,
            v: 17666,
            n: "Stealth Elf (Dark Super Shot)"
        }, {
            i: 26,
            v: 11266,
            n: "Stealth Elf (Dark)"
        }, {
            i: 26,
            v: 14352,
            n: "Stealth Elf (Eon's Elite)"
        }, {
            i: 26,
            v: 7171,
            n: "Stealth Elf (Legendary)"
        }, {
            i: 26,
            v: 10245,
            n: "Stealth Elf (Ninja)"
        }, {
            i: 26,
            v: 6145,
            n: "Stealth Elf (S2)"
        }, {
            i: 3415,
            v: 16640,
            n: "Stealth Elf (Super Shot)"
        }, {
            i: 1006,
            v: 8192,
            n: "Stink Bomb (SFB)"
        }, {
            i: 2006,
            v: 8192,
            n: "Stink Bomb (SFT)"
        }, {
            i: 3406,
            v: 16640,
            n: "Stormblade"
        }, {
            i: 27,
            v: 0,
            n: "Stump Smash"
        }, {
            i: 27,
            v: 6145,
            n: "Stump Smash (S2)"
        }, {
            i: 8,
            v: 0,
            n: "Sunburn"
        }, {
            i: 101,
            v: 4614,
            n: "Swarm (G)"
        }, {
            i: 505,
            v: 12288,
            n: "Terrabite (Mini)"
        }, {
            i: 505,
            v: 0,
            n: "Terrabite (Sidekick)"
        }, {
            i: 5,
            v: 0,
            n: "Terrafin"
        }, {
            i: 5,
            v: 14352,
            n: "Terrafin (Eon's Elite)"
        }, {
            i: 5,
            v: 10245,
            n: "Terrafin (Knockout)"
        }, {
            i: 5,
            v: 6145,
            n: "Terrafin (S2)"
        }, {
            i: 3416,
            v: 16640,
            n: "Terrafin (Shark Shooter)"
        }, {
            i: 3428,
            v: 16640,
            n: "Thrillipede"
        }, {
            i: 3428,
            v: 17677,
            n: "Thrillipede (Eggcited)"
        }, {
            i: 107,
            v: 4614,
            n: "Thumpback (G)"
        }, {
            i: 541,
            v: 12288,
            n: "Thumpling (Mini)"
        }, {
            i: 541,
            v: 4096,
            n: "Thumpling (Sidekick)"
        }, {
            i: 451,
            v: 12317,
            n: "Thunderbolt (Clear) (TM)"
        }, {
            i: 451,
            v: 12288,
            n: "Thunderbolt (TM)"
        }, {
            i: 461,
            v: 12288,
            n: "Torch"
        }, {
            i: 460,
            v: 12288,
            n: "Trail Blazer"
        }, {
            i: 212,
            v: 12302,
            n: "Trap - Air Hourglass"
        }, {
            i: 212,
            v: 12294,
            n: "Trap - Air Jughead"
        }, {
            i: 212,
            v: 12305,
            n: "Trap - Air Screamer"
        }, {
            i: 212,
            v: 12304,
            n: "Trap - Air Snake"
        }, {
            i: 212,
            v: 12312,
            n: "Trap - Air Sword"
        }, {
            i: 212,
            v: 12291,
            n: "Trap - Air Toucan"
        }, {
            i: 218,
            v: 12314,
            n: "Trap - Dark Handstand"
        }, {
            i: 218,
            v: 12308,
            n: "Trap - Dark Spider"
        }, {
            i: 218,
            v: 12312,
            n: "Trap - Dark Sword"
        }, {
            i: 216,
            v: 12298,
            n: "Trap - Earth Hammer"
        }, {
            i: 216,
            v: 12314,
            n: "Trap - Earth Handstand"
        }, {
            i: 216,
            v: 12302,
            n: "Trap - Earth Hourglass"
        }, {
            i: 216,
            v: 12292,
            n: "Trap - Earth Orb"
        }, {
            i: 216,
            v: 12306,
            n: "Trap - Earth Totem"
        }, {
            i: 216,
            v: 12291,
            n: "Trap - Earth Toucan"
        }, {
            i: 215,
            v: 12311,
            n: "Trap - Fire Captain's Hat"
        }, {
            i: 215,
            v: 12289,
            n: "Trap - Fire Flower"
        }, {
            i: 215,
            v: 12297,
            n: "Trap - Fire Flower (New)"
        }, {
            i: 215,
            v: 12305,
            n: "Trap - Fire Screamer"
        }, {
            i: 215,
            v: 12293,
            n: "Trap - Fire Torch"
        }, {
            i: 215,
            v: 12306,
            n: "Trap - Fire Totem"
        }, {
            i: 215,
            v: 12315,
            n: "Trap - Fire Yawn"
        }, {
            i: 220,
            v: 12318,
            n: "Trap - Kaos"
        }, {
            i: 220,
            v: 13599,
            n: "Trap - Kaos (Ultimate)"
        }, {
            i: 217,
            v: 12298,
            n: "Trap - Life Hammer"
        }, {
            i: 217,
            v: 12304,
            n: "Trap - Life Snake"
        }, {
            i: 217,
            v: 12312,
            n: "Trap - Life Sword"
        }, {
            i: 217,
            v: 12293,
            n: "Trap - Life Torch"
        }, {
            i: 217,
            v: 12289,
            n: "Trap - Life Toucan"
        }, {
            i: 217,
            v: 12291,
            n: "Trap - Life Toucan (New)"
        }, {
            i: 217,
            v: 12315,
            n: "Trap - Life Yawn"
        }, {
            i: 219,
            v: 12303,
            n: "Trap - Light Owl"
        }, {
            i: 219,
            v: 12309,
            n: "Trap - Light Rocket"
        }, {
            i: 219,
            v: 12315,
            n: "Trap - Light Yawn"
        }, {
            i: 210,
            v: 12299,
            n: "Trap - Magic Axe"
        }, {
            i: 210,
            v: 12302,
            n: "Trap - Magic Hourglass"
        }, {
            i: 210,
            v: 12289,
            n: "Trap - Magic Log Holder"
        }, {
            i: 210,
            v: 12309,
            n: "Trap - Magic Rocket"
        }, {
            i: 210,
            v: 12296,
            n: "Trap - Magic Skull"
        }, {
            i: 210,
            v: 12306,
            n: "Trap - Magic Totem"
        }, {
            i: 214,
            v: 12295,
            n: "Trap - Tech Angel"
        }, {
            i: 214,
            v: 12310,
            n: "Trap - Tech Flying Helmet"
        }, {
            i: 214,
            v: 12300,
            n: "Trap - Tech Hand"
        }, {
            i: 214,
            v: 12314,
            n: "Trap - Tech Handstand"
        }, {
            i: 214,
            v: 12297,
            n: "Trap - Tech Scepter"
        }, {
            i: 214,
            v: 12289,
            n: "Trap - Tech Tiki"
        }, {
            i: 213,
            v: 12299,
            n: "Trap - Undead Axe"
        }, {
            i: 213,
            v: 12311,
            n: "Trap - Undead Captain's Hat"
        }, {
            i: 213,
            v: 12300,
            n: "Trap - Undead Hand"
        }, {
            i: 213,
            v: 12292,
            n: "Trap - Undead Orb"
        }, {
            i: 213,
            v: 13316,
            n: "Trap - Undead Orb (Legendary)"
        }, {
            i: 213,
            v: 12296,
            n: "Trap - Undead Skull"
        }, {
            i: 213,
            v: 13320,
            n: "Trap - Undead Skull (Legendary)"
        }, {
            i: 213,
            v: 12304,
            n: "Trap - Undead Snake"
        }, {
            i: 211,
            v: 12295,
            n: "Trap - Water Angel"
        }, {
            i: 211,
            v: 12299,
            n: "Trap - Water Axe"
        }, {
            i: 211,
            v: 12310,
            n: "Trap - Water Flying Helmet"
        }, {
            i: 211,
            v: 12294,
            n: "Trap - Water Jughead"
        }, {
            i: 211,
            v: 13318,
            n: "Trap - Water Jughead (Legendary)"
        }, {
            i: 211,
            v: 12290,
            n: "Trap - Water Log Holder"
        }, {
            i: 211,
            v: 12289,
            n: "Trap - Water Tiki"
        }, {
            i: 1009,
            v: 8192,
            n: "Trap Shadow (SFB)"
        }, {
            i: 2009,
            v: 8192,
            n: "Trap Shadow (SFT)"
        }, {
            i: 473,
            v: 12288,
            n: "Tread Head"
        }, {
            i: 112,
            v: 4614,
            n: "Tree Rex (G)"
        }, {
            i: 112,
            v: 5634,
            n: "Tree Rex (Gnarly) (G)"
        }, {
            i: 19,
            v: 0,
            n: "Trigger Happy"
        }, {
            i: 19,
            v: 10245,
            n: "Trigger Happy (Big Bang)"
        }, {
            i: 3414,
            v: 16640,
            n: "Trigger Happy (Double Dare)"
        }, {
            i: 19,
            v: 14352,
            n: "Trigger Happy (Eon's Elite)"
        }, {
            i: 419,
            v: 0,
            n: "Trigger Happy (Legendary)"
        }, {
            i: 3414,
            v: 17666,
            n: "Trigger Happy (Power Blue)"
        }, {
            i: 19,
            v: 6145,
            n: "Trigger Happy (S2)"
        }, {
            i: 19,
            v: 11266,
            n: "Trigger Happy (Springtime)"
        }, {
            i: 519,
            v: 12288,
            n: "Trigger Snappy (Mini)"
        }, {
            i: 519,
            v: 0,
            n: "Trigger Snappy (Sidekick)"
        }, {
            i: 475,
            v: 12317,
            n: "Tuff Luck (Clear) (TM)"
        }, {
            i: 475,
            v: 12288,
            n: "Tuff Luck (TM)"
        }, {
            i: 3240,
            v: 16384,
            n: "Vehicle - Barrel Blaster"
        }, {
            i: 3240,
            v: 17410,
            n: "Vehicle - Barrel Blaster (Dark)"
        }, {
            i: 3223,
            v: 16384,
            n: "Vehicle - Burn-Cycle"
        }, {
            i: 3241,
            v: 16384,
            n: "Vehicle - Buzz Wing"
        }, {
            i: 3233,
            v: 16384,
            n: "Vehicle - Clown Cruiser"
        }, {
            i: 3233,
            v: 17410,
            n: "Vehicle - Clown Cruiser (Dark)"
        }, {
            i: 3227,
            v: 16384,
            n: "Vehicle - Crypt Crusher"
        }, {
            i: 3231,
            v: 16384,
            n: "Vehicle - Dive Bomber"
        }, {
            i: 3231,
            v: 17410,
            n: "Vehicle - Dive Bomber (Spring Ahead)"
        }, {
            i: 3234,
            v: 16384,
            n: "Vehicle - Gold Rusher"
        }, {
            i: 3234,
            v: 17410,
            n: "Vehicle - Gold Rusher (Power Blue)"
        }, {
            i: 3224,
            v: 16388,
            n: "Vehicle - Hot Streak"
        }, {
            i: 3224,
            v: 17410,
            n: "Vehicle - Hot Streak (Dark)"
        }, {
            i: 3224,
            v: 17438,
            n: "Vehicle - Hot Streak (Golden)"
        }, {
            i: 3220,
            v: 16384,
            n: "Vehicle - Jet Stream"
        }, {
            i: 3222,
            v: 16384,
            n: "Vehicle - Reef Ripper"
        }, {
            i: 3237,
            v: 16384,
            n: "Vehicle - Sea Shadow"
        }, {
            i: 3237,
            v: 17410,
            n: "Vehicle - Sea Shadow (Dark)"
        }, {
            i: 3225,
            v: 16384,
            n: "Vehicle - Shark Tank"
        }, {
            i: 3235,
            v: 16384,
            n: "Vehicle - Shield Striker"
        }, {
            i: 3232,
            v: 16384,
            n: "Vehicle - Sky Slicer"
        }, {
            i: 3239,
            v: 16384,
            n: "Vehicle - Soda Skimmer"
        }, {
            i: 3239,
            v: 17410,
            n: "Vehicle - Soda Skimmer (Nitro)"
        }, {
            i: 3238,
            v: 16384,
            n: "Vehicle - Splatter Splasher"
        }, {
            i: 3238,
            v: 17410,
            n: "Vehicle - Splatter Splasher (Power Blue)"
        }, {
            i: 3228,
            v: 16384,
            n: "Vehicle - Stealth Stinger"
        }, {
            i: 3228,
            v: 17410,
            n: "Vehicle - Stealth Stinger (Nitro)"
        }, {
            i: 3236,
            v: 16384,
            n: "Vehicle - Sun Runner"
        }, {
            i: 3236,
            v: 17411,
            n: "Vehicle - Sun Runner (Legendary)"
        }, {
            i: 3226,
            v: 16384,
            n: "Vehicle - Thump Truck"
        }, {
            i: 3221,
            v: 16384,
            n: "Vehicle - Tomb Buggy"
        }, {
            i: 622,
            v: 20480,
            n: "Villain Sensei - Bad Juju"
        }, {
            i: 622,
            v: 21506,
            n: "Villain Sensei - Bad Juju (Mystical)"
        }, {
            i: 624,
            v: 20480,
            n: "Villain Sensei - Blaster-Tron"
        }, {
            i: 621,
            v: 20480,
            n: "Villain Sensei - Chompy Mage"
        }, {
            i: 621,
            v: 21518,
            n: "Villain Sensei - Chompy Mage (Jingle Bell)"
        }, {
            i: 610,
            v: 20480,
            n: "Villain Sensei - Dr. Krankcase"
        }, {
            i: 613,
            v: 20480,
            n: "Villain Sensei - Golden Queen"
        }, {
            i: 613,
            v: 21506,
            n: "Villain Sensei - Golden Queen (Dark)"
        }, {
            i: 623,
            v: 20480,
            n: "Villain Sensei - Grave Clobber"
        }, {
            i: 611,
            v: 20480,
            n: "Villain Sensei - Hood Sickle"
        }, {
            i: 611,
            v: 21506,
            n: "Villain Sensei - Hood Sickle (Steel Plated)"
        }, {
            i: 627,
            v: 20480,
            n: "Villain Sensei - Kaos"
        }, {
            i: 615,
            v: 20480,
            n: "Villain Sensei - Pain-Yatta"
        }, {
            i: 615,
            v: 20513,
            n: "Villain Sensei - Pain-Yatta (Rock Candy)"
        }, {
            i: 612,
            v: 20480,
            n: "Villain Sensei - Tae Kwon Crow"
        }, {
            i: 612,
            v: 21506,
            n: "Villain Sensei - Tae Kwon Crow (Mystical)"
        }, {
            i: 614,
            v: 20480,
            n: "Villain Sensei - Wolfgang"
        }, {
            i: 614,
            v: 21506,
            n: "Villain Sensei - Wolfgang (Dark)"
        }, {
            i: 17,
            v: 0,
            n: "Voodood"
        }, {
            i: 17,
            v: 14352,
            n: "Voodood (Eon's Elite)"
        }, {
            i: 454,
            v: 12288,
            n: "Wallop (TM)"
        }, {
            i: 2,
            v: 0,
            n: "Warnado"
        }, {
            i: 2,
            v: 8710,
            n: "Warnado (LC)"
        }, {
            i: 1015,
            v: 9218,
            n: "Wash Buckler (Dark) (SFB)"
        }, {
            i: 2015,
            v: 9218,
            n: "Wash Buckler (Dark) (SFT)"
        }, {
            i: 1015,
            v: 8192,
            n: "Wash Buckler (SFB)"
        }, {
            i: 2015,
            v: 8192,
            n: "Wash Buckler (SFT)"
        }, {
            i: 507,
            v: 13314,
            n: "Weeruptor (Eggsellent) (Mini)"
        }, {
            i: 507,
            v: 12288,
            n: "Weeruptor (Mini)"
        }, {
            i: 13,
            v: 0,
            n: "Wham-Shell"
        }, {
            i: 13,
            v: 8710,
            n: "Wham-Shell (LC)"
        }, {
            i: 0,
            v: 0,
            n: "Whirlwind"
        }, {
            i: 0,
            v: 14352,
            n: "Whirlwind (Eon's Elite)"
        }, {
            i: 0,
            v: 10245,
            n: "Whirlwind (Horn Blast)"
        }, {
            i: 0,
            v: 7170,
            n: "Whirlwind (Polar)"
        }, {
            i: 0,
            v: 6145,
            n: "Whirlwind (S2)"
        }, {
            i: 526,
            v: 12288,
            n: "Whisper Elf (Mini)"
        }, {
            i: 526,
            v: 0,
            n: "Whisper Elf (Sidekick)"
        }, {
            i: 458,
            v: 13314,
            n: "Wildfire (Dark) (TM)"
        }, {
            i: 458,
            v: 12288,
            n: "Wildfire (TM)"
        }, {
            i: 3011,
            v: 8192,
            n: "Wind Up"
        }, {
            i: 3011,
            v: 9220,
            n: "Wind Up (Gear Head Vicarious Visions)"
        }, {
            i: 23,
            v: 0,
            n: "Wrecking Ball"
        }, {
            i: 23,
            v: 6145,
            n: "Wrecking Ball (S2)"
        }, {
            i: 12,
            v: 0,
            n: "Zap"
        }, {
            i: 12,
            v: 6145,
            n: "Zap (S2)"
        }, {
            i: 3007,
            v: 8192,
            n: "Zoo Lou"
        }, {
            i: 3007,
            v: 9219,
            n: "Zoo Lou (Legendary)"
        }, {
            i: 25,
            v: 0,
            n: "Zook"
        }, {
            i: 25,
            v: 14352,
            n: "Zook (Eon's Elite)"
        }, {
            i: 25,
            v: 6145,
            n: "Zook (S2)"
        }
    ].forEach((function (i) {
            var n = document.createElement("option");
            n.dataset.i = i.i.toString(16).padStart(4, 0),
            n.dataset.v = i.v.toString(16).padStart(4, 0),
            n.text = i.n,
            v.appendChild(n)
        }));
    var t = document.getElementById("uid");
    t.addEventListener("dblclick", (function (i) {
            t.value = ""
        }));
    var o = document.getElementById("name");
    o.addEventListener("dblclick", (function (i) {
            o.value = ""
        }));
    var l = document.getElementById("download");
    l.addEventListener("click", (function (i) {
            l.removeAttribute("download"),
            l.removeAttribute("href");
            let n = function (i) {
                for (var n = 0; n < v.options.length; n++)
                    if (v.options[n].value == i)
                        return v.options[n]
            }
            (o.value);
            if (r(n.dataset.i, 4) && r(n.dataset.v, 4)) {
                let i = r(t.value, 8) ? t.value : function (i) {
                    const n = "0123456789ABCDEF";
                    let e = "";
                    for (let r = 0; r < i; ++r)
                        e += n.charAt(Math.floor(Math.random() * n.length));
                    return e
                }
                (8);
                t.value = i;
                let e = a(Uint8Array.from(i.match(/.{1,2}/g).map((i => parseInt(i, 16)))), Uint8Array.from(n.dataset.i.match(/.{1,2}/g).map((i => parseInt(i, 16)))), Uint8Array.from(n.dataset.v.match(/.{1,2}/g).map((i => parseInt(i, 16))))),
                v = n.text.replace(/[ ]/g, "_").replace(/[\W]/g, "").replace(/_{2,}/g, "_").replace(/_+$/, "").toLowerCase();
                l.download = t.value + "_" + v + ".dump",
                l.href = function (i) {
                    var n = new Blob([i], {
                        type: "application/octet-stream"
                    });
                    return window.URL.createObjectURL(n)
                }
                (e)
            }
        }))
};
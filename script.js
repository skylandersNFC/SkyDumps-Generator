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
	[
		{
			"i": 14,
			"v": 10245,
			"n": "Anchors Away Gill Grunt"
		}, {
			"i": 200,
			"v": 0,
			"n": "Anvil Rain"
		}, {
			"i": 211,
			"v": 12299,
			"n": "Aqua Axe (Water Axe)"
		}, {
			"i": 210,
			"v": 12302,
			"n": "Arcane Hourglass (Magic Hourglass)"
		}, {
			"i": 3302,
			"v": 8710,
			"n": "Arkeyan Crossbow"
		}, {
			"i": 3426,
			"v": 16640,
			"n": "Astroblast"
		}, {
			"i": 214,
			"v": 12295,
			"n": "Automatic Angel (Tech Angel)"
		}, {
			"i": 210,
			"v": 12299,
			"n": "Axe of Illusion (Magic Axe)"
		}, {
			"i": 3446,
			"v": 16384,
			"n": "Bad Juju"
		}, {
			"i": 3476,
			"v": 16384,
			"n": "Bad Juju Vehicle"
		}, {
			"i": 216,
			"v": 12292,
			"n": "Banded Boulder (Earth Orb)"
		}, {
			"i": 540,
			"v": 12288,
			"n": "Barkley (Mini)"
		}, {
			"i": 540,
			"v": 4096,
			"n": "Barkley (Sidekick)"
		}, {
			"i": 3240,
			"v": 16384,
			"n": "Barrel Blaster"
		}, {
			"i": 4,
			"v": 0,
			"n": "Bash"
		}, {
			"i": 4,
			"v": 6145,
			"n": "Bash (Series 2)"
		}, {
			"i": 480,
			"v": 12288,
			"n": "Bat Spin"
		}, {
			"i": 3200,
			"v": 8192,
			"n": "Battle Hammer"
		}, {
			"i": 219,
			"v": 12315,
			"n": "Beam Scream (Light Yawn)"
		}, {
			"i": 19,
			"v": 10245,
			"n": "Big Bang Trigger Happy"
		}, {
			"i": 3420,
			"v": 16640,
			"n": "Big Bubble Pop Fizz"
		}, {
			"i": 3420,
			"v": 17678,
			"n": "Birthday Bash Big Bubble Pop Fizz"
		}, {
			"i": 210,
			"v": 12290,
			"n": "Biter's Bane (Magic Log Holder)"
		}, {
			"i": 485,
			"v": 12288,
			"n": "Blackout"
		}, {
			"i": 1014,
			"v": 8192,
			"n": "Blade"
		}, {
			"i": 453,
			"v": 12288,
			"n": "Blades"
		}, {
			"i": 2004,
			"v": 8192,
			"n": "Blast"
		}, {
			"i": 466,
			"v": 12288,
			"n": "Blastermind"
		}, {
			"i": 215,
			"v": 12315,
			"n": "Blazing Belch (Fire Yawn)"
		}, {
			"i": 106,
			"v": 10245,
			"n": "Blizzard Chill"
		}, {
			"i": 1006,
			"v": 8192,
			"n": "Bomb"
		}, {
			"i": 1006,
			"v": 8214,
			"n": "Bomb (Gold)"
		}, {
			"i": 3417,
			"v": 16640,
			"n": "Bone Bash Roller Brawl"
		}, {
			"i": 3417,
			"v": 16670,
			"n": "Bone Bash Roller Brawl (Dark Bronze)"
		}, {
			"i": 2000,
			"v": 8192,
			"n": "Boom"
		}, {
			"i": 22,
			"v": 0,
			"n": "Boomer"
		}, {
			"i": 22,
			"v": 18448,
			"n": "Boomer (Eon's Elite)"
		}, {
			"i": 502,
			"v": 12288,
			"n": "Bop"
		}, {
			"i": 110,
			"v": 4614,
			"n": "Bouncer"
		}, {
			"i": 506,
			"v": 12288,
			"n": "Breeze"
		}, {
			"i": 212,
			"v": 12291,
			"n": "Breezy Bird (Air Toucan)"
		}, {
			"i": 3456,
			"v": 16384,
			"n": "Broccoli Guy"
		}, {
			"i": 3486,
			"v": 16384,
			"n": "Broccoli Guy Vehicle"
		}, {
			"i": 1015,
			"v": 8192,
			"n": "Buckler"
		}, {
			"i": 1015,
			"v": 8216,
			"n": "Buckler (Colour Shift)"
		}, {
			"i": 3006,
			"v": 8192,
			"n": "Bumble Blast"
		}, {
			"i": 3006,
			"v": 8710,
			"n": "Bumble Blast (LightCore)"
		}, {
			"i": 3223,
			"v": 16384,
			"n": "Burn-Cycle"
		}, {
			"i": 3223,
			"v": 16414,
			"n": "Burn-Cycle (Patina)"
		}, {
			"i": 474,
			"v": 12288,
			"n": "Bushwhack"
		}, {
			"i": 3241,
			"v": 16384,
			"n": "Buzz Wing"
		}, {
			"i": 24,
			"v": 0,
			"n": "Camo"
		}, {
			"i": 3442,
			"v": 16384,
			"n": "Cap'n Cluck"
		}, {
			"i": 3461,
			"v": 16384,
			"n": "Captain Frightbeard"
		}, {
			"i": 1010,
			"v": 8192,
			"n": "Charge"
		}, {
			"i": 3440,
			"v": 16384,
			"n": "Chef Pepper Jack"
		}, {
			"i": 106,
			"v": 4096,
			"n": "Chill"
		}, {
			"i": 106,
			"v": 4614,
			"n": "Chill (LightCore)"
		}, {
			"i": 3464,
			"v": 16384,
			"n": "Chill Bill"
		}, {
			"i": 3494,
			"v": 16384,
			"n": "Chill Bill Vehicle"
		}, {
			"i": 3483,
			"v": 16384,
			"n": "Chompy Buster"
		}, {
			"i": 3453,
			"v": 16384,
			"n": "Chompy Mage"
		}, {
			"i": 30,
			"v": 0,
			"n": "Chop Chop"
		}, {
			"i": 30,
			"v": 18448,
			"n": "Chop Chop (Eon's Elite)"
		}, {
			"i": 30,
			"v": 10262,
			"n": "Chop Chop (Green)"
		}, {
			"i": 30,
			"v": 6148,
			"n": "Chop Chop (Metallic Blue)"
		}, {
			"i": 30,
			"v": 6145,
			"n": "Chop Chop (Series 2)"
		}, {
			"i": 472,
			"v": 12288,
			"n": "Chopper"
		}, {
			"i": 212,
			"v": 12304,
			"n": "Cloudy Cobra (Air Snake)"
		}, {
			"i": 3233,
			"v": 16384,
			"n": "Clown Crusier"
		}, {
			"i": 469,
			"v": 12288,
			"n": "Cobra Cadabra"
		}, {
			"i": 3010,
			"v": 8192,
			"n": "Countdown"
		}, {
			"i": 3010,
			"v": 8710,
			"n": "Countdown (LightCore)"
		}, {
			"i": 102,
			"v": 4614,
			"n": "Crusher"
		}, {
			"i": 3227,
			"v": 16384,
			"n": "Crypt Crusher"
		}, {
			"i": 212,
			"v": 12312,
			"n": "Cyclone Sabre (Air Sword)"
		}, {
			"i": 32,
			"v": 0,
			"n": "Cynder"
		}, {
			"i": 32,
			"v": 6161,
			"n": "Cynder (Glow in the Dark)"
		}, {
			"i": 32,
			"v": 6145,
			"n": "Cynder (Series 2)"
		}, {
			"i": 3240,
			"v": 17410,
			"n": "Dark Barrel Blaster"
		}, {
			"i": 2004,
			"v": 9218,
			"n": "Dark Blast"
		}, {
			"i": 1015,
			"v": 9218,
			"n": "Dark Buckler"
		}, {
			"i": 3233,
			"v": 17410,
			"n": "Dark Clown Crusier"
		}, {
			"i": 218,
			"v": 12312,
			"n": "Dark Dagger (Dark Sword)"
		}, {
			"i": 476,
			"v": 13314,
			"n": "Dark Food Fight"
		}, {
			"i": 3424,
			"v": 17666,
			"n": "Dark Hammer Slam Bowser"
		}, {
			"i": 3224,
			"v": 17410,
			"n": "Dark Hot Streak"
		}, {
			"i": 16,
			"v": 11266,
			"n": "Dark Mega Ram Spyro"
		}, {
			"i": 26,
			"v": 11266,
			"n": "Dark Ninja Stealth Elf"
		}, {
			"i": 3237,
			"v": 17410,
			"n": "Dark Sea Shadow"
		}, {
			"i": 3002,
			"v": 9218,
			"n": "Dark Slobber Tooth"
		}, {
			"i": 462,
			"v": 13314,
			"n": "Dark Snap Shot"
		}, {
			"i": 3412,
			"v": 17666,
			"n": "Dark Spitfire"
		}, {
			"i": 28,
			"v": 0,
			"n": "Dark Spyro"
		}, {
			"i": 3415,
			"v": 17666,
			"n": "Dark Super Shot Stealth Elf"
		}, {
			"i": 3423,
			"v": 17666,
			"n": "Dark Turbo Charge Donkey Kong"
		}, {
			"i": 2015,
			"v": 9218,
			"n": "Dark Wash"
		}, {
			"i": 458,
			"v": 13314,
			"n": "Dark Wildfire"
		}, {
			"i": 1004,
			"v": 9218,
			"n": "Dark Zone"
		}, {
			"i": 303,
			"v": 0,
			"n": "Darklight Crypt"
		}, {
			"i": 9990,
			"v": 12288,
			"n": "DEBUG Core"
		}, {
			"i": 9991,
			"v": 12288,
			"n": "DEBUG Giant"
		}, {
			"i": 999,
			"v": 0,
			"n": "DEBUG Minion"
		}, {
			"i": 9992,
			"v": 12288,
			"n": "DEBUG Ranger"
		}, {
			"i": 3422,
			"v": 16670,
			"n": "Deep Dive Gill Grunt"
		}, {
			"i": 468,
			"v": 12288,
			"n": "Déjà Vu"
		}, {
			"i": 6,
			"v": 0,
			"n": "Dino-Rang"
		}, {
			"i": 6,
			"v": 18448,
			"n": "Dino-Rang (Eon's Elite)"
		}, {
			"i": 3231,
			"v": 16384,
			"n": "Dive Bomber"
		}, {
			"i": 3425,
			"v": 16670,
			"n": "Dive-Clops"
		}, {
			"i": 2003,
			"v": 8192,
			"n": "Doom"
		}, {
			"i": 2003,
			"v": 8214,
			"n": "Doom (Gold)"
		}, {
			"i": 3497,
			"v": 16384,
			"n": "Doom Jet"
		}, {
			"i": 3414,
			"v": 16640,
			"n": "Double Dare Trigger Happy"
		}, {
			"i": 18,
			"v": 0,
			"n": "Double Trouble"
		}, {
			"i": 18,
			"v": 6145,
			"n": "Double Trouble (Series 2)"
		}, {
			"i": 3454,
			"v": 16384,
			"n": "Dr. Krankcase"
		}, {
			"i": 3484,
			"v": 16384,
			"n": "Dr. Krankcase Vehicle"
		}, {
			"i": 212,
			"v": 12294,
			"n": "Drafty Decanter (Air Jughead)"
		}, {
			"i": 3451,
			"v": 16384,
			"n": "Dragon Hunter"
		}, {
			"i": 300,
			"v": 0,
			"n": "Dragon's Peak"
		}, {
			"i": 208,
			"v": 4614,
			"n": "Dragonfire Cannon"
		}, {
			"i": 213,
			"v": 12311,
			"n": "Dream Piercer (Undead Captain's Hat)"
		}, {
			"i": 21,
			"v": 0,
			"n": "Drill Sergeant"
		}, {
			"i": 21,
			"v": 6145,
			"n": "Drill Sergeant (Series 2)"
		}, {
			"i": 1007,
			"v": 8192,
			"n": "Drilla"
		}, {
			"i": 510,
			"v": 12288,
			"n": "Drobit"
		}, {
			"i": 20,
			"v": 0,
			"n": "Drobot"
		}, {
			"i": 20,
			"v": 4614,
			"n": "Drobot (LightCore)"
		}, {
			"i": 20,
			"v": 6145,
			"n": "Drobot (Series 2)"
		}, {
			"i": 3008,
			"v": 8192,
			"n": "Dune Bug"
		}, {
			"i": 3008,
			"v": 8196,
			"n": "Dune Bug (Red)"
		}, {
			"i": 216,
			"v": 12302,
			"n": "Dust of Time (Earth Hourglass)"
		}, {
			"i": 465,
			"v": 12288,
			"n": "Echo"
		}, {
			"i": 3428,
			"v": 17677,
			"n": "Eggcited Thrillipede"
		}, {
			"i": 507,
			"v": 13314,
			"n": "Eggsellent Weeruptor"
		}, {
			"i": 217,
			"v": 12293,
			"n": "Emerald Energy (Life Torch)"
		}, {
			"i": 301,
			"v": 0,
			"n": "Empire of Ice"
		}, {
			"i": 311,
			"v": 20480,
			"n": "Enchanted Elven Forest"
		}, {
			"i": 2008,
			"v": 9218,
			"n": "Enchanted Hoot"
		}, {
			"i": 1008,
			"v": 9218,
			"n": "Enchanted Loop"
		}, {
			"i": 3009,
			"v": 9730,
			"n": "Enchanted Star Strike"
		}, {
			"i": 467,
			"v": 12288,
			"n": "Enigma"
		}, {
			"i": 9,
			"v": 0,
			"n": "Eruptor"
		}, {
			"i": 9,
			"v": 18448,
			"n": "Eruptor (Eon's Elite)"
		}, {
			"i": 9,
			"v": 4614,
			"n": "Eruptor (LightCore)"
		}, {
			"i": 9,
			"v": 6145,
			"n": "Eruptor (Series 2)"
		}, {
			"i": 9,
			"v": 6164,
			"n": "Eruptor (White Flocked)"
		}, {
			"i": 215,
			"v": 12293,
			"n": "Eternal Flame (Fire Torch)"
		}, {
			"i": 114,
			"v": 4614,
			"n": "Eye-Brawl"
		}, {
			"i": 114,
			"v": 4628,
			"n": "Eye-Brawl (Iridescent)"
		}, {
			"i": 114,
			"v": 4629,
			"n": "Eye-Brawl (Pumpkin)"
		}, {
			"i": 543,
			"v": 12288,
			"n": "Eye-Small (Mini)"
		}, {
			"i": 543,
			"v": 4096,
			"n": "Eye-Small (Sidekick)"
		}, {
			"i": 214,
			"v": 12297,
			"n": "Factory Flower (Tech Scepter)"
		}, {
			"i": 3301,
			"v": 8710,
			"n": "Fiery Forge"
		}, {
			"i": 3400,
			"v": 16640,
			"n": "Fiesta"
		}, {
			"i": 2005,
			"v": 8192,
			"n": "Fire"
		}, {
			"i": 2005,
			"v": 8196,
			"n": "Fire (Gold)"
		}, {
			"i": 105,
			"v": 10245,
			"n": "Fire Bone Hot Dog"
		}, {
			"i": 215,
			"v": 12297,
			"n": "Fire Flower (Fire Scepter)"
		}, {
			"i": 456,
			"v": 12288,
			"n": "Fist Bump"
		}, {
			"i": 108,
			"v": 14341,
			"n": "Fizzy Frenzy Pop Fizz"
		}, {
			"i": 11,
			"v": 0,
			"n": "Flameslinger"
		}, {
			"i": 11,
			"v": 6146,
			"n": "Flameslinger (Golden/Bronze)"
		}, {
			"i": 11,
			"v": 6145,
			"n": "Flameslinger (Series 2)"
		}, {
			"i": 103,
			"v": 4096,
			"n": "Flashwing"
		}, {
			"i": 103,
			"v": 8710,
			"n": "Flashwing (LightCore)"
		}, {
			"i": 452,
			"v": 12288,
			"n": "Fling Kong"
		}, {
			"i": 464,
			"v": 12288,
			"n": "Flip Wreck"
		}, {
			"i": 211,
			"v": 12294,
			"n": "Flood Flask (Water Jughead)"
		}, {
			"i": 476,
			"v": 12288,
			"n": "Food Fight"
		}, {
			"i": 2001,
			"v": 8192,
			"n": "Free"
		}, {
			"i": 2014,
			"v": 8192,
			"n": "Freeze"
		}, {
			"i": 115,
			"v": 4096,
			"n": "Fright Rider"
		}, {
			"i": 115,
			"v": 4113,
			"n": "Fright Rider (Glow in the Dark)"
		}, {
			"i": 115,
			"v": 4117,
			"n": "Fright Rider (Halloween)"
		}, {
			"i": 3400,
			"v": 17685,
			"n": "Frightful Fiesta"
		}, {
			"i": 211,
			"v": 12310,
			"n": "Frost Helm (Water Flying Helmet)"
		}, {
			"i": 3004,
			"v": 8192,
			"n": "Fryno"
		}, {
			"i": 100,
			"v": 14341,
			"n": "Full Blast Jet-Vac"
		}, {
			"i": 481,
			"v": 12288,
			"n": "Funny Bone"
		}, {
			"i": 4500,
			"v": 20480,
			"n": "Fusion"
		}, {
			"i": 471,
			"v": 12288,
			"n": "Gearshift"
		}, {
			"i": 218,
			"v": 12314,
			"n": "Ghastly Grimace (Dark Handstand)"
		}, {
			"i": 203,
			"v": 0,
			"n": "Ghost Pirate Swords"
		}, {
			"i": 31,
			"v": 0,
			"n": "Ghost Roaster"
		}, {
			"i": 31,
			"v": 18448,
			"n": "Ghost Roaster (Eon's Elite)"
		}, {
			"i": 14,
			"v": 0,
			"n": "Gill Grunt"
		}, {
			"i": 14,
			"v": 18448,
			"n": "Gill Grunt (Eon's Elite)"
		}, {
			"i": 14,
			"v": 6167,
			"n": "Gill Grunt (Metallic)"
		}, {
			"i": 14,
			"v": 6145,
			"n": "Gill Grunt (Series 2)"
		}, {
			"i": 511,
			"v": 12288,
			"n": "Gill Runt (Mini)"
		}, {
			"i": 511,
			"v": 0,
			"n": "Gill Runt (Sidekick)"
		}, {
			"i": 3492,
			"v": 16384,
			"n": "Glitter Glider"
		}, {
			"i": 3450,
			"v": 16384,
			"n": "Glumshanks"
		}, {
			"i": 540,
			"v": 13314,
			"n": "Gnarly Barkley"
		}, {
			"i": 112,
			"v": 5634,
			"n": "Gnarly Tree Rex"
		}, {
			"i": 3234,
			"v": 16384,
			"n": "Gold Rusher"
		}, {
			"i": 208,
			"v": 5634,
			"n": "Golden Dragonfire Cannon"
		}, {
			"i": 3224,
			"v": 17438,
			"n": "Golden Hot Streak"
		}, {
			"i": 3462,
			"v": 16384,
			"n": "Golden Queen"
		}, {
			"i": 699,
			"v": 20480,
			"n": "Goldie"
		}, {
			"i": 214,
			"v": 12300,
			"n": "Grabbing Gadget (Tech Hand)"
		}, {
			"i": 102,
			"v": 5634,
			"n": "Granite Crusher"
		}, {
			"i": 2007,
			"v": 8192,
			"n": "Grilla"
		}, {
			"i": 3013,
			"v": 8192,
			"n": "Grim Creeper"
		}, {
			"i": 3013,
			"v": 8710,
			"n": "Grim Creeper (LightCore)"
		}, {
			"i": 213,
			"v": 12300,
			"n": "Grim Gripper (Undead Hand)"
		}, {
			"i": 3203,
			"v": 8192,
			"n": "Groove Machine"
		}, {
			"i": 310,
			"v": 20480,
			"n": "Gryphon Park Observatory"
		}, {
			"i": 450,
			"v": 12288,
			"n": "Gusto"
		}, {
			"i": 3424,
			"v": 16670,
			"n": "Hammer Slam Bowser"
		}, {
			"i": 230,
			"v": 12288,
			"n": "Hand of Fate"
		}, {
			"i": 213,
			"v": 12299,
			"n": "Haunted Hatchet (Undead Axe)"
		}, {
			"i": 455,
			"v": 12288,
			"n": "Head Rush"
		}, {
			"i": 202,
			"v": 0,
			"n": "Healing Elixir"
		}, {
			"i": 219,
			"v": 12303,
			"n": "Heavenly Hawk (Light Hawk)"
		}, {
			"i": 111,
			"v": 10245,
			"n": "Heavy Duty Sprocket"
		}, {
			"i": 29,
			"v": 0,
			"n": "Hex"
		}, {
			"i": 29,
			"v": 4614,
			"n": "Hex (LightCore)"
		}, {
			"i": 29,
			"v": 6145,
			"n": "Hex (Series 2)"
		}, {
			"i": 201,
			"v": 0,
			"n": "Hidden Treasure"
		}, {
			"i": 477,
			"v": 12288,
			"n": "High Five"
		}, {
			"i": 3401,
			"v": 16640,
			"n": "High Volt"
		}, {
			"i": 504,
			"v": 12288,
			"n": "Hijinx"
		}, {
			"i": 3004,
			"v": 13313,
			"n": "Hod Wild Fryno"
		}, {
			"i": 3445,
			"v": 16384,
			"n": "Hood Sickle"
		}, {
			"i": 3475,
			"v": 16384,
			"n": "Hood Sickle Vehicle"
		}, {
			"i": 2008,
			"v": 8192,
			"n": "Hoot"
		}, {
			"i": 0,
			"v": 10245,
			"n": "Horn Blast Whirlwind"
		}, {
			"i": 105,
			"v": 4096,
			"n": "Hot Dog"
		}, {
			"i": 105,
			"v": 4117,
			"n": "Hot Dog (Colour Shift)"
		}, {
			"i": 105,
			"v": 10267,
			"n": "Hot Dog (Green Frito-Lay)"
		}, {
			"i": 105,
			"v": 10268,
			"n": "Hot Dog (Purple Frito-Lay)"
		}, {
			"i": 105,
			"v": 10266,
			"n": "Hot Dog (Red Frito-Lay)"
		}, {
			"i": 104,
			"v": 4614,
			"n": "Hot Head"
		}, {
			"i": 104,
			"v": 4627,
			"n": "Hot Head (Sparkle/Glitter)"
		}, {
			"i": 3224,
			"v": 16384,
			"n": "Hot Streak"
		}, {
			"i": 3224,
			"v": 16388,
			"n": "Hot Streak (Event Exclusive Edition)"
		}, {
			"i": 3413,
			"v": 16640,
			"n": "Hurricane Jet-Vac"
		}, {
			"i": 7,
			"v": 10245,
			"n": "Hyper Beam Prism Break"
		}, {
			"i": 10,
			"v": 0,
			"n": "Ignitor"
		}, {
			"i": 10,
			"v": 6145,
			"n": "Ignitor (Series 2)"
		}, {
			"i": 3231,
			"v": 17423,
			"n": "Instant Dive Bomber"
		}, {
			"i": 3425,
			"v": 17679,
			"n": "Instant Dive-Clops"
		}, {
			"i": 476,
			"v": 13327,
			"n": "Instant Food Fight"
		}, {
			"i": 3224,
			"v": 17423,
			"n": "Instant Hot Streak"
		}, {
			"i": 462,
			"v": 13327,
			"n": "Instant Snap Shot"
		}, {
			"i": 3412,
			"v": 17679,
			"n": "Instant Spitfire"
		}, {
			"i": 3415,
			"v": 17679,
			"n": "Instant Super Shot Stealth Elf"
		}, {
			"i": 217,
			"v": 12312,
			"n": "Jade Blade (Life Sword)"
		}, {
			"i": 2005,
			"v": 9218,
			"n": "Jade Fire"
		}, {
			"i": 103,
			"v": 5122,
			"n": "Jade Flashwing"
		}, {
			"i": 1005,
			"v": 9218,
			"n": "Jade Kraken"
		}, {
			"i": 470,
			"v": 12288,
			"n": "Jawbreaker"
		}, {
			"i": 1000,
			"v": 8192,
			"n": "Jet"
		}, {
			"i": 3220,
			"v": 16384,
			"n": "Jet Stream"
		}, {
			"i": 100,
			"v": 4096,
			"n": "Jet-Vac"
		}, {
			"i": 100,
			"v": 4614,
			"n": "Jet-Vac (LightCore)"
		}, {
			"i": 3006,
			"v": 9218,
			"n": "Jolly Bumble Blast"
		}, {
			"i": 459,
			"v": 12288,
			"n": "Ka-Boom"
		}, {
			"i": 3467,
			"v": 16384,
			"n": "Kaos"
		}, {
			"i": 3503,
			"v": 16384,
			"n": "Kaos Trophy"
		}, {
			"i": 3010,
			"v": 9218,
			"n": "Kickoff Countdown"
		}, {
			"i": 469,
			"v": 13314,
			"n": "King Cobra Cadabra"
		}, {
			"i": 482,
			"v": 12288,
			"n": "Knight Light"
		}, {
			"i": 484,
			"v": 12288,
			"n": "Knight Mare"
		}, {
			"i": 5,
			"v": 10245,
			"n": "Knockout Terrafin"
		}, {
			"i": 1005,
			"v": 8192,
			"n": "Kraken"
		}, {
			"i": 1005,
			"v": 8196,
			"n": "Kraken (Gold)"
		}, {
			"i": 478,
			"v": 12288,
			"n": "Krypt King"
		}, {
			"i": 3501,
			"v": 16384,
			"n": "Land Trophy"
		}, {
			"i": 9,
			"v": 10245,
			"n": "Lava Barf Eruptor"
		}, {
			"i": 3421,
			"v": 16640,
			"n": "Lava Lance Eruptor"
		}, {
			"i": 3421,
			"v": 16670,
			"n": "Lava Lance Eruptor (Patina)"
		}, {
			"i": 3426,
			"v": 17667,
			"n": "Legendary Astroblast"
		}, {
			"i": 404,
			"v": 0,
			"n": "Legendary Bash"
		}, {
			"i": 453,
			"v": 13315,
			"n": "Legendary Blades"
		}, {
			"i": 3417,
			"v": 17667,
			"n": "Legendary Bone Bash Roller Brawl"
		}, {
			"i": 110,
			"v": 5635,
			"n": "Legendary Bouncer"
		}, {
			"i": 474,
			"v": 13315,
			"n": "Legendary Bushwhack"
		}, {
			"i": 106,
			"v": 5635,
			"n": "Legendary Chill (LightCore)"
		}, {
			"i": 430,
			"v": 0,
			"n": "Legendary Chop Chop"
		}, {
			"i": 468,
			"v": 13315,
			"n": "Legendary Déjà Vu"
		}, {
			"i": 211,
			"v": 13318,
			"n": "Legendary Flood Flask (Water Jughead)"
		}, {
			"i": 2001,
			"v": 9219,
			"n": "Legendary Free"
		}, {
			"i": 3013,
			"v": 9731,
			"n": "Legendary Grim Creeper"
		}, {
			"i": 230,
			"v": 13315,
			"n": "Legendary Hand of Fate"
		}, {
			"i": 3413,
			"v": 17667,
			"n": "Legendary Hurricane Jet-Vac"
		}, {
			"i": 10,
			"v": 7171,
			"n": "Legendary Ignitor"
		}, {
			"i": 470,
			"v": 13315,
			"n": "Legendary Jawbreaker"
		}, {
			"i": 100,
			"v": 5123,
			"n": "Legendary Jet-Vac"
		}, {
			"i": 2012,
			"v": 9219,
			"n": "Legendary Night"
		}, {
			"i": 1001,
			"v": 9219,
			"n": "Legendary Ranger"
		}, {
			"i": 1012,
			"v": 9219,
			"n": "Legendary Shift"
		}, {
			"i": 15,
			"v": 7171,
			"n": "Legendary Slam Bam"
		}, {
			"i": 213,
			"v": 13320,
			"n": "Legendary Spectral Skull (Undead Orb)"
		}, {
			"i": 213,
			"v": 13316,
			"n": "Legendary Spirit Sphere (Undead Orb)"
		}, {
			"i": 416,
			"v": 0,
			"n": "Legendary Spyro"
		}, {
			"i": 26,
			"v": 7171,
			"n": "Legendary Stealth Elf"
		}, {
			"i": 3236,
			"v": 17311,
			"n": "Legendary Sun Runner"
		}, {
			"i": 419,
			"v": 0,
			"n": "Legendary Trigger Happy"
		}, {
			"i": 3007,
			"v": 9219,
			"n": "Legendary Zoo Lou"
		}, {
			"i": 3,
			"v": 0,
			"n": "Lightning Rod"
		}, {
			"i": 3,
			"v": 6164,
			"n": "Lightning Rod (Iridescent)"
		}, {
			"i": 3,
			"v": 6145,
			"n": "Lightning Rod (Series 2)"
		}, {
			"i": 463,
			"v": 12288,
			"n": "Lob-Star"
		}, {
			"i": 1008,
			"v": 8192,
			"n": "Loop"
		}, {
			"i": 108,
			"v": 15362,
			"n": "Love Potion Pop Fizz"
		}, {
			"i": 2010,
			"v": 8192,
			"n": "Magna"
		}, {
			"i": 214,
			"v": 12310,
			"n": "Makers Mana (Tech Flying Helmet)"
		}, {
			"i": 16,
			"v": 10245,
			"n": "Mega Ram Spyro"
		}, {
			"i": 3460,
			"v": 16384,
			"n": "Mesmeralda"
		}, {
			"i": 308,
			"v": 12800,
			"n": "Midnight Museum"
		}, {
			"i": 542,
			"v": 12288,
			"n": "Mini-Jini (Mini)"
		}, {
			"i": 542,
			"v": 4096,
			"n": "Mini-Jini (Sidekick)"
		}, {
			"i": 305,
			"v": 12288,
			"n": "Mirror of Mystery"
		}, {
			"i": 3425,
			"v": 17678,
			"n": "Missile-Tow Dive-Clops"
		}, {
			"i": 105,
			"v": 5122,
			"n": "Molten Hot Dog"
		}, {
			"i": 3452,
			"v": 16384,
			"n": "Moneybone"
		}, {
			"i": 235,
			"v": 20481,
			"n": "Mystery Chest (Bronze)"
		}, {
			"i": 235,
			"v": 20503,
			"n": "Mystery Chest (Cursed Tiki Temple)"
		}, {
			"i": 235,
			"v": 20483,
			"n": "Mystery Chest (Gold)"
		}, {
			"i": 235,
			"v": 20505,
			"n": "Mystery Chest (Lost Imaginite Mines)"
		}, {
			"i": 235,
			"v": 20482,
			"n": "Mystery Chest (Silver)"
		}, {
			"i": 2012,
			"v": 8192,
			"n": "Night"
		}, {
			"i": 3427,
			"v": 16640,
			"n": "Nightfall"
		}, {
			"i": 3527,
			"v": 16640,
			"n": "Nightfall (Defective)"
		}, {
			"i": 306,
			"v": 12288,
			"n": "Nightmare Express"
		}, {
			"i": 26,
			"v": 10245,
			"n": "Ninja Stealth Elf"
		}, {
			"i": 109,
			"v": 4614,
			"n": "Ninjini"
		}, {
			"i": 1014,
			"v": 9218,
			"n": "Nitro Blade"
		}, {
			"i": 1010,
			"v": 9218,
			"n": "Nitro Charge"
		}, {
			"i": 2014,
			"v": 9218,
			"n": "Nitro Freeze"
		}, {
			"i": 455,
			"v": 13314,
			"n": "Nitro Head Rush"
		}, {
			"i": 478,
			"v": 13314,
			"n": "Nitro Krypt King"
		}, {
			"i": 2010,
			"v": 9218,
			"n": "Nitro Magna"
		}, {
			"i": 3239,
			"v": 17410,
			"n": "Nitro Soda Skimmer"
		}, {
			"i": 3228,
			"v": 17410,
			"n": "Nitro Stealth Stinger"
		}, {
			"i": 3466,
			"v": 16384,
			"n": "Noodles"
		}, {
			"i": 3496,
			"v": 16384,
			"n": "Noodles Vehicle"
		}, {
			"i": 217,
			"v": 12291,
			"n": "Oak Eagle (Life Toucan)"
		}, {
			"i": 3455,
			"v": 16384,
			"n": "Pain-Yatta"
		}, {
			"i": 3485,
			"v": 16384,
			"n": "Pain-Yatta Vehicle"
		}, {
			"i": 508,
			"v": 12288,
			"n": "Pet-Vac"
		}, {
			"i": 32,
			"v": 10245,
			"n": "Phantom Cynder"
		}, {
			"i": 231,
			"v": 12288,
			"n": "Piggy Bank"
		}, {
			"i": 302,
			"v": 0,
			"n": "Pirate Seas"
		}, {
			"i": 201,
			"v": 4096,
			"n": "Platinum Hidden Treasure"
		}, {
			"i": 3202,
			"v": 8192,
			"n": "Platinum Sheep"
		}, {
			"i": 0,
			"v": 7170,
			"n": "Polar Whirlwind"
		}, {
			"i": 108,
			"v": 4096,
			"n": "Pop Fizz"
		}, {
			"i": 3001,
			"v": 8192,
			"n": "Pop Thorn"
		}, {
			"i": 3414,
			"v": 17666,
			"n": "Power Blue Double Dare Trigger Happy"
		}, {
			"i": 3234,
			"v": 17410,
			"n": "Power Blue Gold Rusher"
		}, {
			"i": 3402,
			"v": 17666,
			"n": "Power Blue Splat"
		}, {
			"i": 3238,
			"v": 17410,
			"n": "Power Blue Splatter Splasher"
		}, {
			"i": 508,
			"v": 13314,
			"n": "Power Punch Pet-Vac"
		}, {
			"i": 7,
			"v": 0,
			"n": "Prism Break"
		}, {
			"i": 7,
			"v": 4628,
			"n": "Prism Break (Rare)"
		}, {
			"i": 7,
			"v": 4614,
			"n": "Prism Break (LightCore)"
		}, {
			"i": 7,
			"v": 6145,
			"n": "Prism Break (Series 2)"
		}, {
			"i": 108,
			"v": 5122,
			"n": "Punch Pop Fizz"
		}, {
			"i": 3015,
			"v": 8192,
			"n": "Punk Shock"
		}, {
			"i": 2013,
			"v": 9218,
			"n": "Quickdraw Rattle"
		}, {
			"i": 1013,
			"v": 9218,
			"n": "Quickdraw Shake"
		}, {
			"i": 1001,
			"v": 8192,
			"n": "Ranger"
		}, {
			"i": 2013,
			"v": 8192,
			"n": "Rattle"
		}, {
			"i": 3222,
			"v": 16384,
			"n": "Reef Ripper"
		}, {
			"i": 3014,
			"v": 8192,
			"n": "Rip Tide"
		}, {
			"i": 3014,
			"v": 8214,
			"n": "Rip Tide (Green)"
		}, {
			"i": 1011,
			"v": 8192,
			"n": "Rise"
		}, {
			"i": 216,
			"v": 12291,
			"n": "Rock Hawk (Earth Toucan)"
		}, {
			"i": 232,
			"v": 12288,
			"n": "Rocket Ram"
		}, {
			"i": 457,
			"v": 12288,
			"n": "Rocky Roll"
		}, {
			"i": 3012,
			"v": 8192,
			"n": "Roller Brawl"
		}, {
			"i": 1002,
			"v": 8192,
			"n": "Rouser"
		}, {
			"i": 18,
			"v": 7170,
			"n": "Royal Double Trouble"
		}, {
			"i": 2002,
			"v": 8192,
			"n": "Rubble"
		}, {
			"i": 216,
			"v": 12314,
			"n": "Rubble Trouble (Earth Handstand)"
		}, {
			"i": 210,
			"v": 12309,
			"n": "Rune Rocket (Magic Rocket)"
		}, {
			"i": 3493,
			"v": 16384,
			"n": "Rune Slider"
		}, {
			"i": 3481,
			"v": 16384,
			"n": "Scale Biter"
		}, {
			"i": 109,
			"v": 5634,
			"n": "Scarlet Ninjini"
		}, {
			"i": 215,
			"v": 12305,
			"n": "Scorching Stopper (Fire Screamer)"
		}, {
			"i": 3003,
			"v": 8192,
			"n": "Scorp"
		}, {
			"i": 3003,
			"v": 8214,
			"n": "Scorp (Green)"
		}, {
			"i": 209,
			"v": 4614,
			"n": "Scorpion Striker Catapult"
		}, {
			"i": 3000,
			"v": 8192,
			"n": "Scratch"
		}, {
			"i": 3237,
			"v": 16384,
			"n": "Sea Shadow"
		}, {
			"i": 3502,
			"v": 16384,
			"n": "Sea Trophy"
		}, {
			"i": 215,
			"v": 12306,
			"n": "Searing Spinner (Fire Totem)"
		}, {
			"i": 217,
			"v": 12304,
			"n": "Seed Serpent (Life Snake)"
		}, {
			"i": 1009,
			"v": 8192,
			"n": "Shadow"
		}, {
			"i": 1009,
			"v": 8214,
			"n": "Shadow (Silver)"
		}, {
			"i": 218,
			"v": 12308,
			"n": "Shadow Spider (Dark Spider)"
		}, {
			"i": 1013,
			"v": 8192,
			"n": "Shake"
		}, {
			"i": 3416,
			"v": 16640,
			"n": "Shark Shooter Terrafin"
		}, {
			"i": 3225,
			"v": 16384,
			"n": "Shark Tank"
		}, {
			"i": 3300,
			"v": 8192,
			"n": "Sheep Wreck Island"
		}, {
			"i": 3235,
			"v": 16384,
			"n": "Shield Striker"
		}, {
			"i": 3235,
			"v": 16414,
			"n": "Shield Striker (Patina)"
		}, {
			"i": 1012,
			"v": 8192,
			"n": "Shift"
		}, {
			"i": 219,
			"v": 12309,
			"n": "Shining Ship (Light Rocket)"
		}, {
			"i": 479,
			"v": 12288,
			"n": "Short Cut"
		}, {
			"i": 479,
			"v": 12317,
			"n": "Short Cut (Clear)"
		}, {
			"i": 113,
			"v": 4096,
			"n": "Shroomboom"
		}, {
			"i": 113,
			"v": 4614,
			"n": "Shroomboom (LightCore)"
		}, {
			"i": 113,
			"v": 4119,
			"n": "Shroomboom (Metallic)"
		}, {
			"i": 217,
			"v": 12315,
			"n": "Shrub Shrieker (Life Yawn)"
		}, {
			"i": 3201,
			"v": 8192,
			"n": "Sky Diamond"
		}, {
			"i": 3472,
			"v": 16384,
			"n": "Sky Scrambler"
		}, {
			"i": 3232,
			"v": 16384,
			"n": "Sky Slicer"
		}, {
			"i": 3500,
			"v": 16384,
			"n": "Sky Trophy"
		}, {
			"i": 205,
			"v": 0,
			"n": "Sky-Iron Shield"
		}, {
			"i": 216,
			"v": 12298,
			"n": "Slag Hammer (Earth Hammer)"
		}, {
			"i": 15,
			"v": 0,
			"n": "Slam Bam"
		}, {
			"i": 15,
			"v": 18448,
			"n": "Slam Bam (Eon's Elite)"
		}, {
			"i": 15,
			"v": 6145,
			"n": "Slam Bam (Series 2)"
		}, {
			"i": 3002,
			"v": 8192,
			"n": "Slobber Tooth"
		}, {
			"i": 509,
			"v": 12288,
			"n": "Small Fry"
		}, {
			"i": 3411,
			"v": 16640,
			"n": "Smash Hit"
		}, {
			"i": 3005,
			"v": 8192,
			"n": "Smolderdash"
		}, {
			"i": 3005,
			"v": 8710,
			"n": "Smolderdash (LightCore)"
		}, {
			"i": 462,
			"v": 12288,
			"n": "Snap Shot"
		}, {
			"i": 3406,
			"v": 16654,
			"n": "Snow-Brite Stormblade"
		}, {
			"i": 3005,
			"v": 8729,
			"n": "Snowderdash (Special)"
		}, {
			"i": 211,
			"v": 12295,
			"n": "Soaking Staff (Water Angel)"
		}, {
			"i": 3239,
			"v": 16384,
			"n": "Soda Skimmer"
		}, {
			"i": 1,
			"v": 0,
			"n": "Sonic Boom"
		}, {
			"i": 1,
			"v": 6161,
			"n": "Sonic Boom (Glow in the Dark)"
		}, {
			"i": 1,
			"v": 6145,
			"n": "Sonic Boom (Series 2)"
		}, {
			"i": 1,
			"v": 6163,
			"n": "Sonic Boom (Sparkle/Glitter)"
		}, {
			"i": 210,
			"v": 12296,
			"n": "Sorcerous Skull (Magic Skull)"
		}, {
			"i": 215,
			"v": 12311,
			"n": "Spark Speak (Fire Captain's Hat)"
		}, {
			"i": 207,
			"v": 0,
			"n": "Sparx the Dragonfly"
		}, {
			"i": 213,
			"v": 12296,
			"n": "Spectral Skull (Undead Skull)"
		}, {
			"i": 210,
			"v": 12306,
			"n": "Spell Slapper (Magic Totem)"
		}, {
			"i": 3463,
			"v": 16384,
			"n": "Spellslamzer"
		}, {
			"i": 216,
			"v": 12306,
			"n": "Spinning Sandstorm (Earth Totem)"
		}, {
			"i": 3482,
			"v": 16384,
			"n": "Spirit Dragster"
		}, {
			"i": 213,
			"v": 12292,
			"n": "Spirit Sphere (Undead Orb)"
		}, {
			"i": 3402,
			"v": 16640,
			"n": "Splat"
		}, {
			"i": 3238,
			"v": 16384,
			"n": "Splatter Splasher"
		}, {
			"i": 213,
			"v": 12304,
			"n": "Spooky Snake (Undead Snake)"
		}, {
			"i": 483,
			"v": 12288,
			"n": "Spotlight"
		}, {
			"i": 3231,
			"v": 17410,
			"n": "Spring Ahead Dive Bomber"
		}, {
			"i": 19,
			"v": 11266,
			"n": "Springtime Trigger Happy"
		}, {
			"i": 111,
			"v": 4096,
			"n": "Sprocket"
		}, {
			"i": 111,
			"v": 10265,
			"n": "Sprocket (Heavy Metal)"
		}, {
			"i": 111,
			"v": 4115,
			"n": "Sprocket (Sparkle/Glitter)"
		}, {
			"i": 503,
			"v": 12288,
			"n": "Spry"
		}, {
			"i": 2011,
			"v": 8192,
			"n": "Spy"
		}, {
			"i": 16,
			"v": 0,
			"n": "Spyro"
		}, {
			"i": 16,
			"v": 18448,
			"n": "Spyro (Eon's Elite)"
		}, {
			"i": 16,
			"v": 6145,
			"n": "Spyro (Series 2)"
		}, {
			"i": 3009,
			"v": 8192,
			"n": "Star Strike"
		}, {
			"i": 3009,
			"v": 8710,
			"n": "Star Strike (LightCore)"
		}, {
			"i": 26,
			"v": 0,
			"n": "Stealth Elf"
		}, {
			"i": 26,
			"v": 18448,
			"n": "Stealth Elf (Eon's Elite)"
		}, {
			"i": 26,
			"v": 6145,
			"n": "Stealth Elf (Series 2)"
		}, {
			"i": 3228,
			"v": 16384,
			"n": "Stealth Stinger"
		}, {
			"i": 3480,
			"v": 16384,
			"n": "Steam Roller"
		}, {
			"i": 3412,
			"v": 16640,
			"n": "Steel Plated Smash Hit"
		}, {
			"i": 2006,
			"v": 8192,
			"n": "Stink"
		}, {
			"i": 2006,
			"v": 8214,
			"n": "Stink (Silver)"
		}, {
			"i": 1003,
			"v": 8192,
			"n": "Stone"
		}, {
			"i": 1003,
			"v": 8214,
			"n": "Stone (Bronze)"
		}, {
			"i": 3471,
			"v": 16384,
			"n": "Storm Striker"
		}, {
			"i": 212,
			"v": 12305,
			"n": "Storm Warning (Air Screamer)"
		}, {
			"i": 3406,
			"v": 16640,
			"n": "Stormblade"
		}, {
			"i": 3441,
			"v": 16384,
			"n": "Stratosfear"
		}, {
			"i": 27,
			"v": 0,
			"n": "Stump Smash"
		}, {
			"i": 27,
			"v": 6145,
			"n": "Stump Smash (Series 2)"
		}, {
			"i": 27,
			"v": 6164,
			"n": "Stump Smash (White Flocked)"
		}, {
			"i": 3473,
			"v": 16384,
			"n": "Sub Woofer"
		}, {
			"i": 3236,
			"v": 16384,
			"n": "Sun Runner"
		}, {
			"i": 8,
			"v": 0,
			"n": "Sunburn"
		}, {
			"i": 307,
			"v": 12800,
			"n": "Sunscraper Spire"
		}, {
			"i": 108,
			"v": 10245,
			"n": "Super Gulp Pop Fizz"
		}, {
			"i": 3415,
			"v": 16640,
			"n": "Super Shot Stealth Elf"
		}, {
			"i": 113,
			"v": 14337,
			"n": "Sure Shot Shroomboom"
		}, {
			"i": 101,
			"v": 4614,
			"n": "Swarm"
		}, {
			"i": 4501,
			"v": 20480,
			"n": "Synergy"
		}, {
			"i": 214,
			"v": 12289,
			"n": "Tech Totem (Tech Tiki)"
		}, {
			"i": 212,
			"v": 12302,
			"n": "Tempest Timer (Air Hourglass)"
		}, {
			"i": 1999,
			"v": 8192,
			"n": "Template (Bottom)"
		}, {
			"i": 2999,
			"v": 8192,
			"n": "Template (Top)"
		}, {
			"i": 6999,
			"v": 16384,
			"n": "Template Air Vehicle"
		}, {
			"i": 5999,
			"v": 16384,
			"n": "Template Land Vehicle"
		}, {
			"i": 3999,
			"v": 8192,
			"n": "Template Legacy"
		}, {
			"i": 7999,
			"v": 16384,
			"n": "Template Sea Vehicle"
		}, {
			"i": 4999,
			"v": 16384,
			"n": "Template Vehicle"
		}, {
			"i": 505,
			"v": 12288,
			"n": "Terrabite (Mini)"
		}, {
			"i": 505,
			"v": 0,
			"n": "Terrabite (Sidekick)"
		}, {
			"i": 5,
			"v": 0,
			"n": "Terrafin"
		}, {
			"i": 5,
			"v": 18448,
			"n": "Terrafin (Eon's Elite)"
		}, {
			"i": 5,
			"v": 6145,
			"n": "Terrafin (Series 2)"
		}, {
			"i": 3465,
			"v": 16384,
			"n": "The Gulper"
		}, {
			"i": 3495,
			"v": 16384,
			"n": "The Gulper Vehicle"
		}, {
			"i": 220,
			"v": 12318,
			"n": "The Kaos Trap"
		}, {
			"i": 3491,
			"v": 16384,
			"n": "The Lil' Phantom Tide"
		}, {
			"i": 24,
			"v": 10245,
			"n": "Thorn Horn Camo"
		}, {
			"i": 3444,
			"v": 16384,
			"n": "Threatpack"
		}, {
			"i": 3474,
			"v": 16384,
			"n": "Threatpack Vehicle"
		}, {
			"i": 3428,
			"v": 16640,
			"n": "Thrillipede"
		}, {
			"i": 3226,
			"v": 16384,
			"n": "Thump Truck"
		}, {
			"i": 107,
			"v": 4614,
			"n": "Thumpback"
		}, {
			"i": 541,
			"v": 12288,
			"n": "Thumpling (Mini)"
		}, {
			"i": 541,
			"v": 4096,
			"n": "Thumpling (Sidekick)"
		}, {
			"i": 451,
			"v": 12288,
			"n": "Thunderbolt"
		}, {
			"i": 451,
			"v": 12317,
			"n": "Thunderbolt (Clear)"
		}, {
			"i": 211,
			"v": 12289,
			"n": "Tidal Tiki (Water Tiki)"
		}, {
			"i": 14,
			"v": 14345,
			"n": "Tidal Wave Gill Grunt"
		}, {
			"i": 233,
			"v": 12288,
			"n": "Tiki Speaky"
		}, {
			"i": 204,
			"v": 0,
			"n": "Time Twister Hourglass"
		}, {
			"i": 3470,
			"v": 16384,
			"n": "Toaster Bomber"
		}, {
			"i": 3221,
			"v": 16384,
			"n": "Tomb Buggy"
		}, {
			"i": 3221,
			"v": 16414,
			"n": "Tomb Buggy (Dark Bronze)"
		}, {
			"i": 214,
			"v": 12314,
			"n": "Topsy Techy (Tech Handstand)"
		}, {
			"i": 461,
			"v": 12288,
			"n": "Torch"
		}, {
			"i": 3301,
			"v": 8192,
			"n": "Tower of Time"
		}, {
			"i": 460,
			"v": 12288,
			"n": "Trail Blazer"
		}, {
			"i": 2009,
			"v": 8192,
			"n": "Trap"
		}, {
			"i": 2009,
			"v": 8214,
			"n": "Trap (Bronze)"
		}, {
			"i": 473,
			"v": 12288,
			"n": "Tread Head"
		}, {
			"i": 112,
			"v": 4614,
			"n": "Tree Rex"
		}, {
			"i": 19,
			"v": 0,
			"n": "Trigger Happy"
		}, {
			"i": 19,
			"v": 18448,
			"n": "Trigger Happy (Eon's Elite)"
		}, {
			"i": 19,
			"v": 6145,
			"n": "Trigger Happy (Series 2)"
		}, {
			"i": 519,
			"v": 12288,
			"n": "Trigger Snappy (Mini)"
		}, {
			"i": 519,
			"v": 0,
			"n": "Trigger Snappy (Sidekick)"
		}, {
			"i": 475,
			"v": 12288,
			"n": "Tuff Luck"
		}, {
			"i": 475,
			"v": 12317,
			"n": "Tuff Luck (Clear)"
		}, {
			"i": 3423,
			"v": 16670,
			"n": "Turbo Charge Donkey Kong"
		}, {
			"i": 100,
			"v": 10245,
			"n": "Turbo Jet-Vac"
		}, {
			"i": 30,
			"v": 10245,
			"n": "Twin Blade Chop Chop"
		}, {
			"i": 3204,
			"v": 8192,
			"n": "UFO Hat"
		}, {
			"i": 220,
			"v": 13343,
			"n": "Ultimate Kaos Trap"
		}, {
			"i": 4502,
			"v": 20480,
			"n": "Unity"
		}, {
			"i": 9,
			"v": 11266,
			"n": "Volcanic Eruptor"
		}, {
			"i": 304,
			"v": 0,
			"n": "Volcanic Vault"
		}, {
			"i": 17,
			"v": 0,
			"n": "Voodood"
		}, {
			"i": 17,
			"v": 18448,
			"n": "Voodood (Eon's Elite)"
		}, {
			"i": 3011,
			"v": 9220,
			"n": "VVind-Up (Gear Head)"
		}, {
			"i": 454,
			"v": 12288,
			"n": "Wallop"
		}, {
			"i": 2,
			"v": 0,
			"n": "Warnado"
		}, {
			"i": 2,
			"v": 8710,
			"n": "Warnado (LightCore)"
		}, {
			"i": 2015,
			"v": 8192,
			"n": "Wash"
		}, {
			"i": 2015,
			"v": 8216,
			"n": "Wash (Colour Shift)"
		}, {
			"i": 3490,
			"v": 16384,
			"n": "Wave Singer"
		}, {
			"i": 217,
			"v": 12298,
			"n": "Weed Whacker (Life Hammer)"
		}, {
			"i": 507,
			"v": 12288,
			"n": "Weeruptor"
		}, {
			"i": 211,
			"v": 12290,
			"n": "Wet Walter (Water Log Holder)"
		}, {
			"i": 13,
			"v": 0,
			"n": "Wham-Shell"
		}, {
			"i": 13,
			"v": 8710,
			"n": "Wham-Shell (LightCore)"
		}, {
			"i": 0,
			"v": 0,
			"n": "Whirlwind"
		}, {
			"i": 0,
			"v": 18448,
			"n": "Whirlwind (Eon's Elite)"
		}, {
			"i": 0,
			"v": 6145,
			"n": "Whirlwind (Series 2)"
		}, {
			"i": 0,
			"v": 6162,
			"n": "Whirlwind (Stone)"
		}, {
			"i": 526,
			"v": 12288,
			"n": "Whisper Elf (Mini)"
		}, {
			"i": 526,
			"v": 0,
			"n": "Whisper Elf (Sidekick)"
		}, {
			"i": 458,
			"v": 12288,
			"n": "Wildfire"
		}, {
			"i": 3011,
			"v": 8192,
			"n": "Wind-Up"
		}, {
			"i": 206,
			"v": 0,
			"n": "Winged Boots"
		}, {
			"i": 463,
			"v": 13314,
			"n": "Winterfest Lob-Star"
		}, {
			"i": 3443,
			"v": 16384,
			"n": "Wolfgang"
		}, {
			"i": 23,
			"v": 0,
			"n": "Wrecking Ball"
		}, {
			"i": 23,
			"v": 6164,
			"n": "Wrecking Ball (Iridescent)"
		}, {
			"i": 23,
			"v": 6145,
			"n": "Wrecking Ball (Series 2)"
		}, {
			"i": 12,
			"v": 0,
			"n": "Zap"
		}, {
			"i": 12,
			"v": 6145,
			"n": "Zap (Series 2)"
		}, {
			"i": 1004,
			"v": 8192,
			"n": "Zone"
		}, {
			"i": 3007,
			"v": 8192,
			"n": "Zoo Lou"
		}, {
			"i": 25,
			"v": 0,
			"n": "Zook"
		}, {
			"i": 25,
			"v": 18448,
			"n": "Zook (Eon's Elite)"
		}, {
			"i": 25,
			"v": 6145,
			"n": "Zook (Series 2)"
		}, {
			"i": 25,
			"v": 6162,
			"n": "Zook (Stone)"
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
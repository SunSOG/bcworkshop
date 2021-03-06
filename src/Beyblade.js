"use strict";

let EventEmitter;
try{
    EventEmitter = require("eventemitter3");
}catch(err){
    EventEmitter = require("events");
}

const Mode = require("./structures/Mode");
const Passive = require("./structures/Passive");
const Special = require("./structures/Special");

/**
 * Beyblade builder
 * @extends EventEmitter
 * @prop {String} name The name of the Bey.
 * @prop {String} type The type of the Bey (Attack, Defense, Stamina or Balance).
 * @prop {String} imageLink The image link of the Bey (file path or web link).
 * @prop {Array} aliases Array of Strings of aliases of the Bey.
 * @prop {Array} specials Array of all special moves that the Bey can use.
 * @prop {Array} passives Array of all passive stat boosts or attacks that the Bey can use.
 * @prop {Array} modes Array of all modes that the Bey can be in.
 * @prop {Boolean} sdchangable The possibility of the player changing the spin direction of the Bey.
 * @prop {String} sd Default spin direction. Must be either "Left" or "Right".
 */

class Beyblade extends EventEmitter {
    /**
     * @param {Object} [stats] Statistics of the Bey.
     * @param {String} [stats.name] The name of the Bey.
     * @param {String} [stats.type] The type of the Bey (Attack, Defense, Stamina, Balance).
     * @param {String} [stats.imageLink] The image link of the Bey (file path or web link).
     * @param {Array} [stats.aliases] Array of Strings of aliases of the Bey.
     */
    constructor(stats){
        super();
        stats = Object.assign({
            name: "Beyblade",
            type: "Type",
            imageLink: "https://images-ext-1.discordapp.net/external/SkyihHxg4MHJ_qWWMLPFNPYVV-Z1XnxCfqd0EQrXYXA/%3Fsize%3D128/https/cdn.discordapp.com/avatars/570115430786531340/e3ff8924f1d5d41c975907008f0059f2.png?width=100&height=100",
            aliases: []
        }, stats);
        this.name = stats.name;
        this.type = stats.type;
        this.imageLink = stats.imageLink;
        this.aliases = stats.aliases;
        this.specials = [];
        this.passives = [];
        this.modes = [];
        this.vars = [];
        this.sdchangable = false;
        this.sd = "Right";
    }
    /**
     * Attaches a special to the Bey
     * @param {Special} special The special to be added.
     * @returns {Beyblade}
     */
    attachSpecial(special){
        if(special instanceof Special !== true){
            throw new Error("Specials must be an instance of the Special class.");
        }
        this.specials.push(special);
        return this;
    }
    /**
     * Attaches a passive to the Bey.
     * @param {Passive} passive The passive to be added.
     * @returns {Beyblade}
     */
    attachPassive(passive){
        if(passive instanceof Passive !== true){
            throw new Error("Passives must be an instance of the Passive class.");
        }
        this.passives.push(passive);
        return this;
    }
    /**
     * Attaches a mode to the Bey.
     * @param {Mode} mode The mode to be attached.
     * @returns {Beyblade}
     */
    attachMode(mode){
        if(mode instanceof Mode !== true){
            throw new Error("Modes must be an instance of the Mode class.");
        }
        this.modes.push(mode);
        return this;
    }
    /**
     * Sets the possibly of a spin direction change.
     * @param {Boolean} changable The possibility referenced by a Boolean.
     * @returns {Beyblade}
     */
    setSDChangable(changable){
        this.sdchangable = changable;
        return this;
    }
    /**
     * Sets the default spin direction for the Bey to be in if not changed by the player.
     * @param {String} value Must be either "Left" or "Right"
     * @returns {Beyblade}
     */
    setDefaultSD(value){
        this.sd = value;
        return this;
    }
    /**
     * 
     * @param {String} identifier The idenifier (name) of the property.
     * @param {*} value The value the property should contain.
     * @returns {Beyblade}
     */
    addProperty(identifier, value){
        this.vars.push({name: identifier, value: value});
        return this;
    }
}

module.exports = Beyblade;
//  You can ignore this file. 
//  This file is used by the host machine of the original bot to host the bot.
//  The software needed for this file is getting open sourced when we know it's ready and bug free.
//  But for now it's useless for you, almost.
//  You can still use this to learn how we host the bot and what you need to do to host it.

/**
 * @name "CyBR~ROSE"
 * @type {Bot}
 * @package
 * // Modules
 * @module require('./index.js') as Main // Main
 * @module require('./cfg.js') as Config // Config
 * @module require('./setup.js') as FirstBootScript // First boot script
 * // Defaults
 * @default Bot = "Main"
 * @default Config = "Config"
 * @default Firstboot = "FirstBootScript"
 * // Infos
 * @author "AmyTheCutie"
 * @version "1.0.0"
 * @license "MIT"
 * @description "CyBR~ROSE"
 */

 process.env.MAIN = async() => {
    const conf: any = {
        bot: Bot,
        cfg: Config,
        setup: Firstboot
    }
    this.env.set(process.env, conf.cfg)
    if(this.env.prog.times == 0) {
        this.env.install()
        this.env.run(conf.setup)
    }
    this.env.start() & this.env.run(conf.bot)

    this.env = {
        run: (args) => "nvm exec node " + args,
        start: (args) => "nvm exec yarn start",
        install: (args) => "nvm exec yarn",
    }
}
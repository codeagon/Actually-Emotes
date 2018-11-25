module.exports = function ActuallyEmotes(mod) {

    const data = require('./data.json')
    let emoteList = [],
        inEmote = false,
        myRace = mod.game.me.race

    for (let i = 1; i <= 100; i++) {
        emoteList.push({ id: i })
    }

    mod.hook('S_SOCIAL', 1, () => {
        if (inEmote == true) {
            return false
        }
    })

    mod.game.on('enter_game', () => {
        mod.send('S_AVAILABLE_SOCIAL_LIST', 1, {
            emotes: emoteList
        })
    })

    mod.command.add('e', (cmd) => {
        inEmote = true
        switch (cmd) {
            case 'other':
                //add stuff for other mods to use here
                break
            case 'init':
                mod.send('S_AVAILABLE_SOCIAL_LIST', 1, {
                    emotes: emoteList
                })
                break
            case 'gimmemyidleback':
            case 'off':
            case 'idle':
                inEmote = false
                mod.command.message('Idles returned')
                break
            case 'settle':
            case 'set':
            case 'sit':
                emoteMyShhhhSTUFFUpFAAAAM('settle')
                break
            case 'peace':
            case 'camera':
                emoteMyShhhhSTUFFUpFAAAAM('peace')
                break
            case 'bow':
                animMyStuffUpBecauseEmoteDoesntWork('bow')
                break
            case 'kitchen':
                emoteMyShhhhSTUFFUpFAAAAM('kitchen')
                break
            case 'gftime':
                animMyStuffUpBecauseEmoteDoesntWork('gftime')
                break
            case 'gftoday':
                animMyStuffUpBecauseEmoteDoesntWork('gftoday')
                break
            case 'attack':
            case 'aot':
            case 'animetrash':
                animMyStuffUpBecauseEmoteDoesntWork('AttackOnTitan')
                break
            default:
                animMyStuffUpBecauseEmoteDoesntWork(cmd)
                mod.command.message(`Unknown emote, attempting to play animation anyway ${cmd}!`)
        }
    })


    function animMyStuffUpBecauseEmoteDoesntWork(emote) {
        mod.send('S_PLAY_ANIMATION', 1, {
            gameId: mod.game.me.gameId,
            rate: 1,
            animName: emote
        })
    }

    function emoteMyShhhhSTUFFUpFAAAAM(emote) {//this would've been good if BHS weren't meanies thankfully settle works with this because it doesn't really work with animation
        inEmote = true
        mod.send('S_INVEN', 16, {
            gameId: mod.game.me.gameId,
            items: [{ id: data[myRace].item[emote], ownerId: mod.game.me.gameId, amount: 1, slot: 17 }]
        })
        setTimeout(() => {
            mod.send('S_SOCIAL', 1, {
                target: mod.game.me.gameId,
                animation: data[myRace].emote[emote],
            });
        }, 200)
    }

    this.destructor = () => {
        mod.command.remove('e');
    };
}

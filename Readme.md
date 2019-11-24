# RuneScape Discord bot

## Contributing

## Running

Get a discord bot token and start `npm run dev`.
Set the token in a `.env.development` file.

### Structure

RuneScape API stuff related calculations go in `src/runescape`.  
Discord bot stuff and commands go in `src/discord`.

Discord commands are in `src/discord/messageHandler`.
They can all contribute help text for the help command by exporting a `HelpProvider`.  
Enablign a bot and it's `HelpProvider` is done in `src/discord/index.ts`

## References

### Discord

| Page                                                             | Description      |
| ---------------------------------------------------------------- | ---------------- |
| https://discordjs.guide/creating-your-bot/#creating-the-bot-file | Discord bot docs |

### RuneScape

| Page                                                                                                                                              | Description                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| https://runescape.wiki/w/Application_programming_interface                                                                                        | RS APIs                        |
| https://runescape.wiki/w/Module:Exchange/Abyssal_whip                                                                                             | Wiki GE page                   |
| https://runescape.wiki/w/Module:Exchange/Abyssal_whip?action=raw                                                                                  | Raw data, for programs         |
| https://apps.runescape.com/runemetrics/quests?user=USERNAME                                                                                       | RuneMetrics quests             |
| https://apps.runescape.com/runemetrics/profile?user=USERNAME&activities=0                                                                         | RuneMetrics profile            |
| https://secure.runescape.com/m=website-data/playerDetails.ws?membership=true&names=[%22USERNAME%22]&callback=angular.callbacks._1&_=1448901242774 | RuneMetrics player clan info   |
| https://apps.runescape.com/runemetrics/images/skill-icons/woodcutting.png                                                                         | Skill icons                    |
| https://secure.runescape.com/m=avatar-rs/USERNAME/chat.png                                                                                        | returns 302 to a user avatar   |
| https://secure.runescape.com/m=avatar-rs/USERNAME/ownclan.png                                                                                     | returns a 302 to a clan avatar |
| https://apps.runescape.com/runemetrics/xp-monthly?searchName=USERNAME&skillid=SKILL_ID                                                            | Monthly xp                     |

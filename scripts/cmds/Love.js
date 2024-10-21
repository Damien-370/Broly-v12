module.exports = {
  config: {
    name: "love",
    aliases: ["lve"],
    version: "1.0",
    author: "ʬɸʬ Shïsûį Dånïęl ʬɸʬ",
    countDown: 10,
    role: 0,
    shortDescription: "Play miss, the oldest gambling game",
    longDescription: "Play miss, the oldest gambling game, and earn money",
    category: "game",
    guide: "{pn} <amy/rouge> <amount of money>"
  },

  onStart: async function ({ args, message, usersData, event }) {
    const betType = args[0];
    const betAmount = parseInt(args[1]);
    const user = event.senderID;
    const userData = await usersData.get(event.senderID);

    if (!["amy", "rouge"].includes(betType)) {
      return message.reply("🎶| ℭ𝔥𝔬𝔦𝔰𝔦𝔰 𝔞𝔪𝔶 𝔬𝔲 𝔯𝔬𝔲𝔤𝔢");
    }

    if (!Number.isInteger(betAmount) || betAmount < 1000) {
      return message.reply("𝐭𝐮 𝐯𝐞𝐮𝐱 𝐭𝐫𝐚𝐧𝐬𝐟𝐞́𝐫𝐞́ 𝐝𝐞 𝐥'𝐚𝐫𝐠𝐞𝐧𝐭 ? 𝐟𝐚𝐮𝐭 𝐚𝐢𝐝𝐞𝐫 𝐥𝐞𝐬 𝐩𝐚𝐮𝐯𝐫𝐞𝐬 𝐜'𝐞𝐬𝐭 𝐛𝐢𝐞𝐧 𝐜̧𝐚 🙃");
    }

    if (betAmount > userData.money) {
      return message.reply("𝐬𝐚𝐥𝐞 𝐦𝐞𝐧𝐝𝐢𝐚𝐧𝐭 𝐝𝐞́𝐠𝐚𝐠𝐞 ❌😒 𝐭𝐮 𝐧'𝐚𝐬 𝐫𝐢𝐞𝐧 𝐩𝐮𝐢𝐬 𝐭𝐮 𝐨𝐬𝐞 𝐣𝐨𝐮𝐞𝐫 𝐯𝐚 𝐦𝐞𝐧𝐝𝐢𝐞𝐫 ! ");
    }

    const dice = [1, 2, 3, 4, 5, 6];
    const results = [];

    for (let i = 0; i < 3; i++) {
      const result = dice[Math.floor(Math.random() * dice.length)];
      results.push(result);
    }

    const winConditions = {
      small: results.filter((num, index, arr) => num >= 1 && num <= 3 && arr.indexOf(num) !== index).length > 0,
      big: results.filter((num, index, arr) => num >= 4 && num <= 6 && arr.indexOf(num) !== index).length > 0,
    };

    const resultString = results.join(" | ");

    if ((winConditions[betType] && Math.random() <= 0.4) || (!winConditions[betType] && Math.random() > 0.4)) {
      const winAmount = 4 * betAmount;
      userData.money += winAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`⚜️ 𝐖𝐈𝐍𝐍𝐄𝐑 ⚜️\n━━━━━━━━━━━━━━━━\n[ 🎰${resultString}🎰 ]\n🙃 | 𝐰𝐡𝐚𝐨𝐮 ( ͡°Ĺ̯ ͡° ) 𝐭𝐮 𝐚𝐬 𝐞𝐮 𝐥𝐚 𝐜𝐡𝐚𝐧𝐜𝐞🐞🍀 𝐫𝐞𝐬𝐬𝐚𝐢 𝐞𝐧𝐜𝐨𝐫𝐞 😑 🀄${winAmount}€🀄`);
    } else {
      userData.money -= betAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`⚜️ 𝐖𝐈𝐍𝐍𝐄𝐑 ⚜️\n━━━━━━━━━━━━━━━━\n[🎰${resultString}🎰]\n\n🤣 | 🤣🤣 𝐣𝐞 𝐬𝐚𝐯𝐚𝐢𝐬😙 𝐭𝐮 𝐚𝐬 𝐩𝐞𝐫𝐝𝐮 ಥ⁠‿⁠ಥ🀄${betAmount}€🀄`);
    }
  }
};

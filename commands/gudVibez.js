const gudVibez = (interaction, client) => {
    const emojiArray = ['(ﾉ◕ヮ◕)ﾉ', '(つ◔‿◔)つ', '(つ◠‿◠)つ', '(つ≧◡≦)つ'];
    const randomIndex = Math.floor(Math.random() * emojiArray.length); 
    const mentionedMember = interaction.mentions.members.first();
    
    if (mentionedMember) {
        interaction.reply(`${emojiArray[randomIndex]} ✨✨ ${mentionedMember}`);
    } else return;
}
export default gudVibez;
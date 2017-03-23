const ruleTable = {
  paper:     { beats: 'rock',  by: 'covers' },
  rock:      { beats: 'scissors', by: 'crushes' },
  scissors:  { beats: 'paper', by: 'cut' }
};

const winner = (p1, p2) => {
    if (p1.strike !== p2.strike) {
        if (p1.strike && !p2.strike) return 'player1';
        if (p2.strike && !p1.strike) return 'player2';
        if (p1.strike === rules.beats(p2.strike)) return 'player1';
        if (p2.strike === rules.beats(p1.strike)) return 'player2';
    }
    return 'tie';
}

const winningStrike = strike => {
    return `${strike} ${ruleTable[strike].by} ${ruleTable[strike].beats}`;
}

const rules = {
    winner,
    by: winningStrike,
    beats: strike => Object.keys(ruleTable).find(k => ruleTable[k].beats === strike),
    beatenBy: strike => ruleTable[strike].beats,
    list: Object.keys(ruleTable).map(k => ruleTable[k])
};

export default rules;

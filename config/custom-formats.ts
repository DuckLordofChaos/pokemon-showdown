
// general modifications
Standard NatDex
Adjust Level = 200

// abilities

//test 1: pigeot, Pidgeot abilities
export const Pokedex: import('../sim/dex-species').SpeciesDataTable = {
	pidgeot: {
		num: 18,
		name: "Pidgeot",
		types: ["Normal", "Flying"],
		baseStats: { hp: 83, atk: 80, def: 75, spa: 70, spd: 70, spe: 101 },
		abilities: { 0: "Keen Eye", 1: "Tangled Feet", 2: "Keen Eye + Sheer Force", 3: "Tangled Feet + Sheer Force", H: "Big Pecks", H: "Big Pecks + Sheer Force" },
		heightm: 1.5,
		weightkg: 39.5,
		color: "Brown",
		prevo: "Pidgeotto",
		evoLevel: 36,
		eggGroups: ["Flying"],
		otherFormes: ["Pidgeot-Mega"],
		formeOrder: ["Pidgeot", "Pidgeot-Mega"],
};

	keeneye_sheerforce: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Keen Eye", `[of] ${target}`);
				}
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
	},
	sheerforce: {
		onModifyMove(move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				// Technically not a secondary effect, but it is negated
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				move.hasSheerForce = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.hasSheerForce) return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Keen Eye + Sheer Force",
		rating: 5,
		num: 1020,
	},
};

const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 15;
const STRONG_ATTACK_VALUE = 20;
const HEAL_VALUE = 25;

const enteredValue = prompt(
  'Please enter a maximum life for you and the monster.',
  '100'
);

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function resetCurrentGame() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamange = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth = currentPlayerHealth - playerDamange;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    alert('You used your bonus life.');
    setPlayerHealth(initialPlayerHealth + 10);
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('Player wins!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('Player lost!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('This is a draw!');
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    resetCurrentGame();
  }
}

function attackMonster(attackMode) {
  let maxDamage;
  if (attackMode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
  } else if (attackMode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth = currentMonsterHealth - damage;
  endRound();
}

function attackHandler() {
  attackMonster('ATTACK');
}

function strongAttackHandler() {
  attackMonster('STRONG_ATTACK');
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert('You cannot heal more than your max initial health.');
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth = currentPlayerHealth + healValue;
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);

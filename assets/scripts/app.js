const ATTACK_VALUE = 10;
const MONSTER_ATTACK = 15;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
  const damage = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth = currentMonsterHealth - damage;
  const playerDamange = dealPlayerDamage(MONSTER_ATTACK);
  currentPlayerHealth = currentPlayerHealth - playerDamange;
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('Player wins!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('Player lost!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('This is a draw!');
  }
}

attackBtn.addEventListener('click', attackHandler);

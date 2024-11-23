const cardsContainer = document.getElementById('cardsContainer');
const gameStarter = document.getElementById('gameStarter');
const cardsNumber = document.getElementById('cardsNumber');
const audioTheSameCard =new Audio('sounds/zapsplat_cartoon_witches_cackle_laugh_001_20682.mp3');
const audioNotTheSameCard = new Audio('sounds/zapsplat_horror_monster_creature_growling_evil_laugh_004_59764.mp3');
const audioIntro = new Audio('sounds/zapsplat_sound_design_cinematic_hit_bright_stutter_intro_20268.mp3');
const audioCardOpen =new Audio('sounds/zapsplat_household_aftershave_card_box_open_002_36600.mp3');
let counter = 0;
const allCards = [
    `images/img_1.png`,
    `images/img_1.png`,
    `images/img_2.png`,
    `images/img_2.png`,
    `images/img_3.png`,
    `images/img_3.png`,
    `images/img_4.png`,
    `images/img_4.png`,
    `images/img_5.png`,
    `images/img_5.png`,
    `images/img_6.png`,
    `images/img_6.png`,
    `images/img_7.png`,
    `images/img_7.png`,
    `images/img-8.png`,
    `images/img-8.png`,
    `images/img_9.png`,
    `images/img_9.png`,
    `images/img_10.png`,
    `images/img_10.png`,
    `images/img_11.png`,
    `images/img_11.png`,
    `images/img_12.png`,
    `images/img_12.png`,
    `images/img_13.png`,
    `images/img_13.png`,
    `images/img_14.png`,
    `images/img_14.png`,
    `images/img_15.png`,
    `images/img_15.png`,
    `images/img_16.png`,
    `images/img_16.png`,
];

let flippedCards = [];

gameStarter.addEventListener('click', () => {
    cardsContainer.innerHTML = '';
    flippedCards = [];
    audioIntro.play();

    const shuffledCards = [];
    for (let i = 0; i < cardsNumber.value; i++) {
        shuffledCards.push(allCards[i]);
    }
    shuffledCards.sort(() => Math.random() - 0.5);

    for (let i = 0; i < shuffledCards.length; i++) {
        const oneCard = document.createElement('div');
        oneCard.classList.add('cardClass');

        oneCard.addEventListener('click', () => {
            if (flippedCards.length < 2 && !oneCard.classList.contains('flipped')) {
                oneCard.classList.add('flipped');
                oneCard.style.backgroundImage = `url(${shuffledCards[i]})`; 
                audioCardOpen.play();
                flippedCards.push(oneCard);


                if (flippedCards.length === 2) {
                    setTimeout(() => {

                        if (flippedCards[0].style.backgroundImage !== flippedCards[1].style.backgroundImage) {
                            flippedCards.forEach(card => {
                                audioNotTheSameCard.play();
                                card.classList.remove('flipped');
                                card.style.backgroundImage = '';
                                

                            });
                        } else if (flippedCards[0].style.backgroundImage == flippedCards[1].style.backgroundImage) {
                            counter += 2;
                            audioTheSameCard.play();
                            if (counter == shuffledCards.length) {
                                setTimeout(() => {

                                    cardsContainer.innerHTML = '<div class="win-message">You win!😈</div>';
                                    const winMessage = document.querySelector('.win-message');
                                    setTimeout(() => {
                                        winMessage.classList.add('show');
                                    }, 100);
                                }, 1000);
                                counter = 0;
                            }


                        }

                        flippedCards = [];
                    }, 1000);
                }
            }
        });

        cardsContainer.appendChild(oneCard);
    }
});

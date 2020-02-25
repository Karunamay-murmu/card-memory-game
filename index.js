const difficulty = document.querySelector('#difficulty');
const cards = document.querySelector('#noOfCards');
const start = document.querySelector('.start-button');
const option = document.querySelector('#user-options');

start.addEventListener('click', () => {

    option.style.display = 'none';

    // let selectedDiff = difficulty.options[difficulty.selectedIndex].value;
    let selectedCards = Number(cards.options[cards.selectedIndex].value);



    /*Create A Parent DIV for the images*/
    const cardsGrid = document.createElement('div');
    cardsGrid.id = 'cards-grid';
    //*Create A Parent DIV for the images*//



    /*Dynamically add grid style to cards*/
    switch (selectedCards) {
        case 4:
            cardsGrid.className = 'cards-grid-4';
            break;
        case 6:
            cardsGrid.className = 'cards-grid-6';
            break;
        case 12:
            cardsGrid.className = 'cards-grid-12';
            break;
        case 16:
            cardsGrid.className = 'cards-grid-16';
            break;
        default:
            cardsGrid.className = 'cards-grid-16';
            break;
    };
    /*--x--Dynamically add grid style to cards--x--*/

    let images = [
        './Assets/apple.png',
        './Assets/cherry.png',
        './Assets/apricot.png',
        './Assets/grape.png',
        './Assets/kiwi.png',
        './Assets/pear.png',
        './Assets/pineapple.png',
        './Assets/watermelon.png',
        './Assets/tomato.png',
        './Assets/radish.png',
    ];

    /*Loop to create muliple child element*/
    for (var i = 0; i < selectedCards; i++) {
        const childDiv = document.createElement('div');

        const frontImage = document.createElement('img');
        const backImage = document.createElement('div');


        frontImage.className = 'grid-item-image';
        backImage.setAttribute('class', 'grid-item grid-item-backSide displayImage')
        childDiv.className = 'grid-item';
        childDiv.id = `grid${i + 1}`;

        childDiv.appendChild(frontImage);
        childDiv.appendChild(backImage);
        cardsGrid.appendChild(childDiv);
    }
    //*Loop to create muliple child element*//



    document.querySelector('#user-options').after(cardsGrid);
    const imageCard = document.querySelectorAll('.grid-item-image');



    /*Create random numbers and add to an array*/
    const randomNumArray = (count, num) => {
        let temp = [];
        let j = 0
        while (j < count) {
            const random = Math.floor(Math.random() * num);
            if (temp.indexOf(random) === -1) {
                temp.push(random);
                j++;
            }
        }
        return temp;
    };
    //*Create random numbers and add to an array*//



    /*Split the existing array with small chunks*/
    const arrayChunk = () => {
        const temp = randomNumArray(selectedCards, selectedCards);
        let chunk = 2;
        let imageIndex = [];
        for (var count = 0; count < selectedCards; count += chunk) {
            imageIndex.push(temp.slice(count, count + chunk));
        }
        return imageIndex;
    };
    //*Split the existing array with small chunks *//



    const imageSelect = () => {
        return randomNumArray(selectedCards / 2, images.length)
    };



    /*Assign random pick image to random image element to the DOM*/
    (function imageAssign() {
        let selectedImage = imageSelect();
        let imagePosition = arrayChunk();

        let count = 0;
        while (count < imagePosition.length) {
            let j = 0;
            while (j < selectedImage.length) {
                imageCard[imagePosition[count][0]].src = images[selectedImage[j]];
                imageCard[imagePosition[count][1]].src = images[selectedImage[j]];
                j++;
                count++;
            }
        };
    })();
    //*Assign random pick image to random image element to the DOM *//



    /*Design Main Gameplay*/
    (function gamePlay() {
        let backImage = document.querySelectorAll('.grid-item-backSide')
        backImage.className = 'hello'
        let image1Src, image2Src, image1, image2, click = 0, cardMatch = 0;

        const resetValue = () => {
            image1Src = null;
            image2Src = null;
            image1 = null;
            image2 = null;
            click = 0;

        };

        /*showing images for 5 sec*/
        (function initialDisplay() {
            const timer = 2500;
            setTimeout(() => {
                backImage.forEach(element => {
                    element.classList.remove('displayImage');
                })
            }, timer)
        })();
        //*showing images for 5 sec*//



        /*show & hide image after click*/
        const showImage = image => image.classList.add('displayImage')
        const hideImage = image => {
            setTimeout(() => {
                image.forEach(image => {
                    image.classList.remove('displayImage')
                })
            }, 700)
        };
        //*show & hide image after click*//



        /*add & remove click events to image*/
        (addClickEvent = () => backImage.forEach(image => image.addEventListener('click', onClick)))();
        const removeClickEvent = clickElement => clickElement.removeEventListener('click', onClick);
        //*add & remove Events to image*//



        /*onClick callback function*/
        function onClick(e) {
            click += 1;
            let image = e.target.previousSibling

            if (click == 1) {
                image1Src = image.getAttribute('src');
                image1 = e.target;
                removeClickEvent(image);
                showImage(e.target)
            }
            if (click == 2) {
                image2Src = image.getAttribute('src');
                image2 = e.target;
                removeClickEvent(image);
                showImage(e.target)
            }
            const result = imageMatch(image1Src, image2Src);
            if (result) gameResult(result, [image1, image2]);
        }
        //*onClick callback function*//



        //return home page//
        const returnHome = () => {
            const buttonDiv = document.createElement('div');
            const button = document.createElement('button');

            buttonDiv.className = 'start-again'
            button.className = 'start-button';
            button.appendChild(document.createTextNode('Start Again'));
            buttonDiv.appendChild(button)
            cardsGrid.after(buttonDiv);

            return 'gameFinish';
        }
        //*return home page*//



        /*checking two image match or not*/
        const imageMatch = (image1Src, image2Src) => {
            if (image1Src && image2Src) {
                if (image1Src === image2Src) {
                    cardMatch++
                    if (cardMatch === selectedCards / 2) returnHome();
                    return 'matched';
                } else return 'unmatched';
            }
        }
        //*checking two image match or not*//



        //game result//
        const gameResult = (result, image) => {
            if (result == 'matched') {
                image1.previousSibling.style.cssText = 'border: 5px solid lightgreen; border-radius: 5px';
                image2.previousSibling.style.cssText = 'border: 5px solid lightgreen; border-radius: 5px';

            } else {
                addClickEvent();
                hideImage(image);
            }
            resetValue();
        }
        //*game result*//


    })();
    //*Design Main Gameplay*//

})

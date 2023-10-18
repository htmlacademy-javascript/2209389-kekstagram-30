const COMMENT_ID = createRandomIdFromRange(1, 6);
const PHOTO_ID = createRandomIdFromRange (1, 25);
const PICTURE_ID = createRandomIdFromRange(1, 25);
const LIKES_ID = createRandomIdFromRange(15, 200);
const DESCRIPTION = [
  'Я эгоист, но при этот ответственный. Поэтому я не совершаю того, из-за чего будет кому-то плохо.',
  'Кто-то уйдет и бросит тебя, а кто-то встанет рядом и будет прикрывать от пуль. ',
  'Я так мало цепляюсь за жизнь, что совсем не боюсь смерти.',
  'Если ты одинок, то это не ровно тому, что ты слабый. Только сильный человек может ждать того, кто заслуживает.',
  'Есть такое понятие, как жить дальше. Попробуй, возможно, получится.',
  'Я очень хороший человек, жаль моей жене не всегда это нравится.',
  'Не важно, чем я занят в данный момент, в любом моем деле присутствует дух соперничества.',
  'Я пришел из ниоткуда, поэтому не боюсь пропасть в никуда.',
  'Думай не о том, что я сказал, а о том, о чем решил промолчать.',
  'Даже если у вас есть голова, это совсем не означает наличие в ней мозга.',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Bilfinger', 'Borzel', 'Gavein', 'Zenkrebe', 'Noskov', 'Synevite'];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generateCommentId = createIdGenerator();

function createRandomIdFromRange (min, max) {
  const previousValues = []; //здесь хранятся все созданные идентификаторы
  return function () {
    let currentValue = getRandomInteger(min, max); //получаем случайное целое число
    if (previousValues.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${ min } до ${ max}`);
      return null;
    }

    while (previousValues.includes(currentValue)) { //проверяем на уникальность (includes возвращает true false)
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue); //добавляем полученное случайное число в массив-хранилище идентификаторов

    return currentValue; //возвращаем случайное целое число
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => ({
  id: generateCommentId (),
  avatar: `img/avatar-${COMMENT_ID()}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = () => ({
  id: PHOTO_ID(),
  url: `photos/${PICTURE_ID()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: LIKES_ID(),
  comments: createComment(),
});

const photoDescription = Array.from({length: 25}, createPhotoDescription);

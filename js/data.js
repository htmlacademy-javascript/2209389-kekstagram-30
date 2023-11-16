import { getRandomArrayElement, createIdGenerator, getRandomInteger } from './util.js';

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 20;


const DESCRIPTIONS = [
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

const generateCommentId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId (),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});


const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from(
    {length: getRandomInteger(0, COMMENT_COUNT) },
    createComment,
  ),
});

const getPictures = () => Array.from(
  {length: PICTURE_COUNT},
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);

export {getPictures};

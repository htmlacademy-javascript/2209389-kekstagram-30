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
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = []; //здесь хранятся все созданные идентификаторы
  return function () {
    let currentValue = getRandomInteger(min, max); //получаем случайное целое число
    previousValues.push(currentValue); //добавляем полученное случайное число в массив-хранилище идентификаторов
    //остановился здесь
  return currentValue //возвращаем случайное целое число
  };
}

const getRandomArrayElement = (elements) => {
return elements[getRandomInteger(0, elements.length - 1)]
}

const createComment = () => {
  return {
/* id: '',
avatar: 'img/avatar-6.svg',*/
message: getRandomArrayElement(MESSAGES),
name: getRandomArrayElement(NAMES),
  };
};




//функция, создающая объект - описание фотографии, опубликованной пользователем.
const createDescription = () => {
  return
  id: '',
  url: '',
  description: '',
  likes: '';
  comments: [{
    id: '',
  avatar: 'img/avatar-6.svg',
  message: 'В целом всё неплохо. Но не всё.',
  name: 'Артём',
  }, {}]
}

//функции для создания массива
//массив из 25 сгенерированных объектов
//объект 1 из 25 - описание фотографии
//объект состоит {
  id: число от 1 до 25 (Number)
  url: строка внутри нее число от 1 до 25 (String)
  description: содержит описание (string)
  likes: число лайков от  15 до 200 (number)
  comments: [
    вложенный в массив объект comments {
      id: любое число (number)
      avatar: img/avatar-(случайное число от 1-6).svg (string)
      message: выбрать 1 или 2 случайных предложения (string)
      name: имя придумай 6 любых (string)
    }
  ]

}


import React from 'react';
function Square(props) {
  const xImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_X.svg/1200px-Red_X.svg.png"
  const oImage = "https://i.pinimg.com/originals/29/c3/e2/29c3e257f4e0df69b5eaf255fc9070cb.png"
  let image = null;

  if (props.value === 'X') {
    image = <img src={xImage} alt="X" />;
  } else if (props.value === 'O') {
    image = <img src={oImage} alt="O" />;
  }
  return (
    <button className="square" onClick={props.onClick}>
      {image}
    </button>
  );
}

export default Square
import "./Card.css";

const Card = ({ title, body, imageLink }) => {
  return (
    <div className="card">
      <div className="card-top">
        <img src={imageLink} />
      </div>
      <div className="card-bottom">
        <h1>{title}</h1>
        <p>{body?.slice(0, 50)}...</p>
      </div>
    </div>
  );
};

export default Card;

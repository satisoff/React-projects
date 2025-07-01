import "./Title.css"

function Title({
    subTitle="SubTitle Here", title="Title Here"
}) {
    return(
        <div className="title">
            <p>{subTitle}</p>
            <h2>{title}</h2>
        </div>
    );
}

export default Title
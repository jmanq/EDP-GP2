import Character from "./Character";

const Home = (props) => {


    return (
        <>
        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {
                props.data.map((character) => (
                    <Character key={character._id} data={character}/>
                ))
            }
        </div>
        </>
    );
};

export default Home;
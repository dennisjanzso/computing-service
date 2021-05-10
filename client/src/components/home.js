import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    services: state.services,
  };
}

function Home(props) {
  function genList () {
      var service_list = [];
      Object.keys(props.services).forEach(function(key) {
        service_list.push(props.services[key]);
      });
      return <ul style={{margin: '2em'}}>{service_list.map(service => <li>
        <div className="card">
          <div className="card-content">
            <span className="card-title">{service.name}</span>
            <p>{service.description}</p>
            <a href={"/service?id=" + service.id} style={{marginTop: '1em'}} className="waves-effect waves-light btn">Select</a>
          </div>
        </div>
      </li>)}</ul>
  }

  return (
    <div>
      {genList()}
    </div>
  );
}

const WrappedHome = connect(mapStateToProps, null)(Home);

export default WrappedHome;

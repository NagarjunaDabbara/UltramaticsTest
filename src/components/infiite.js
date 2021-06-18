import React,{useState} from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';

const style = {
  border: "1px solid black",
};

const scroll = {

  width: "200px",
  height: "10rem",
  padding: "1em",
  "overflow-y": "scroll",
  "text-align": "center"
}
class Infinite extends React.Component {

  componentDidMount() {
    axios.get(`https://randomuser.me/api/?results=20`)
      .then(res => {
        const persons = res.data.results;
        this.setState({ persons });
      })
  }

   state = {
    persons: []
  }

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
    axios.get(`https://randomuser.me/api/?results=20`)
      .then(res => {
        const persons = res.data.results;
              this.setState({
        persons: this.state.persons.concat(persons)
      });
      })

    }, 500);
  };

 render() {
    return (
      <div>
        <hr />
        <div id="scrollableDiv" class="mt-10" style={{ height: 500, width: 300 ,overflow: "auto",margin:"1rem 0rem" }}>
          <InfiniteScroll
            dataLength={this.state.persons?.length}
            next={this.fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            {this.state.persons.map((i, index) => (
              <div style={style} key={index}>
                {i?.name['first']} {i?.name['last']}<br/>
                {i?.cell}
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default Infinite
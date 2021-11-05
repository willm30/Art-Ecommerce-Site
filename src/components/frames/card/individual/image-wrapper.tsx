import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { Component } from "react";

class IndImg extends Component {
  constructor(props) {
    super(props);
    this.state = { innerWidth: undefined };
  }

  componentDidMount() {
    this.setState({
      innerWidth: typeof window != undefined && window.innerWidth,
    });
  }

  render() {
    const orientationStyles =
      this.props.orientation == "Landscape" ? "flex-60" : "flex-40";

    return (
      <div className={`${orientationStyles} border-8 border-white`}>
        <Link
          to={
            this.state.innerWidth > 767
              ? this.props.path.includes("/xl")
                ? null
                : `${this.props.path}/xl`
              : null
          }
        >
          <GatsbyImage
            image={this.props.image}
            alt={this.props.alt}
          ></GatsbyImage>
        </Link>
      </div>
    );
  }
}

export default IndImg;

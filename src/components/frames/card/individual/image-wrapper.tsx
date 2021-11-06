import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { Component } from "react";
import {
  getBackgroundPosition,
  getCursorPosition,
  getLeftPosition,
  getTopPosition,
  getXOffset,
  getYOffset,
} from "../../../../utilities/magnify";
import CustomLink from "../../../navigation/customLink";
import Magnifier from "../../magnifier";

class IndImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursor: { x: undefined, y: undefined },
      innerWidth: undefined,
      left: undefined,
      top: undefined,
      imageContainer: undefined,
      magnifier: undefined,
      magnifierDisplay: "none",
      magnifierId: "Magnifier",
      backgroundPosition: undefined,
      zoom: 2,
    };
  }

  componentDidMount() {
    const imgCont =
      typeof document != undefined && document.getElementById(this.props.title);

    const top = imgCont.getBoundingClientRect().top;
    const left = imgCont.getBoundingClientRect().left;

    this.setState({
      innerWidth: typeof window != undefined && window.innerWidth,
      imageContainer: imgCont,
      magnifier:
        typeof document != undefined &&
        document.getElementById(this.state.magnifierId),
      position: {
        left,
        top,
      },
    });
  }

  render() {
    const orientationStyles =
      this.props.orientation == "Landscape" ? "flex-60" : "flex-40";

    const isMobile = this.state.innerWidth < 768;
    const isXL = this.props.path.includes("/xl");
    const linkPath = isMobile || isXL ? null : `${this.props.path}/xl`;
    const backgroundSize = `${this.state.imageContainer?.clientWidth * 2}px ${
      this.state.imageContainer?.clientHeight * 2
    }px`;

    return (
      <div className={`${orientationStyles} border-8 border-white`}>
        <div
          id={this.props.title}
          onMouseMove={this.handleMousemove.bind(this)}
        >
          <CustomLink path={linkPath}>
            <GatsbyImage
              image={this.props.image}
              alt={this.props.alt}
            ></GatsbyImage>
          </CustomLink>
          <Magnifier
            display={isXL ? "" : "hidden"}
            backgroundPosition={this.state.backgroundPosition}
            backgroundImage={`url(${this.props.url})`}
            backgroundSize={backgroundSize}
            left={this.state.left}
            top={this.state.top}
            id={this.state.magnifierId}
          />
        </div>
      </div>
    );
  }

  handleMousemove(e) {
    this.setState({
      cursor: { x: getCursorPosition(e).x, y: getCursorPosition(e).y },
      backgroundPosition: `-${getBackgroundPosition(
        getXOffset(this.state.magnifier, this.state.imageContainer),
        getXOffset(getCursorPosition(e).x, this.state.magnifier),
        this.state.zoom
      )}px -${getBackgroundPosition(
        getYOffset(this.state.magnifier, this.state.imageContainer),
        getYOffset(getCursorPosition(e).y, this.state.magnifier),
        this.state.zoom
      )}px`,
      left: `${getLeftPosition(
        this.state.magnifier,
        this.state.imageContainer,
        getCursorPosition(e).x
      )}px`,
      top: `${getTopPosition(
        this.state.magnifier,
        this.state.imageContainer,
        getCursorPosition(e).y
      )}px`,
    });
  }
}

export default IndImg;

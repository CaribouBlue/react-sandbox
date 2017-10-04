import React from 'react';
import $ from 'jquery';

const DragBox = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mousePosition: {
        x: 0,
        y: 0,
      },
      clickPosition: {
        x: 0,
        y: 0,
      },
      activeItem: null,
      initialItemPosition: {
        top: 0,
        left: 0,
      },
    };
  }

  componentDidMount() {
    $(document).on('mousemove', (e) => {
      this.setState({
        mousePosition: {
          x: e.clientX,
          y: e.clientY,
        }
      });

      if (this.state.activeItem) {
        this.moveItem();
      }
    });

    $('.item').on('mousedown', (e) => {
      const initialItemPosition = $(e.target).position();
      this.setState({
        clickPosition: {
          x: e.clientX,
          y: e.clientY,
        },
        activeItem: e.target,
        initialItemPosition,
      });
    });

    $(document).on('mouseup', (e) => {
      if(this.state.activeItem) {
        this.adjustItem();
        this.setState({ activeItem: null });
      }
    });
  }

  moveItem() {
    const itemWidth = $(this.state.activeItem).outerWidth();
    const itemHeight = $(this.state.activeItem).outerHeight();
    const boxWidth = $('#box').innerWidth() - itemWidth;
    const boxHeight = $('#box').innerHeight() - itemHeight;
    let top = this.state.mousePosition.y - this.state.clickPosition.y;
    let left = this.state.mousePosition.x - this.state.clickPosition.x;
    const boxPosition = $('#box').position();
    if (this.state.initialItemPosition.left + left < boxPosition.left) {
      left = boxPosition.left - this.state.initialItemPosition.left;
    }
    if (this.state.initialItemPosition.left + left > boxPosition.left + boxWidth) {
      left = boxPosition.left - this.state.initialItemPosition.left + boxWidth;
    }

    if (this.state.initialItemPosition.top + top < boxPosition.top) {
      top = boxPosition.top - this.state.initialItemPosition.top;
    }
    if (this.state.initialItemPosition.top + top > boxPosition.top + boxHeight) {
      top = boxPosition.top - this.state.initialItemPosition.top + boxHeight;
    }
    $(this.state.activeItem).css({
      top: top,
      left: left,
    });
  }

  adjustItem(topAdj, leftAdj) {
    const top = Number($(this.state.activeItem).css('top').slice(0, -2));
    const left = Number($(this.state.activeItem).css('left').slice(0,-2));
    $(this.state.activeItem).animate({
      top: topAdj ? (top - top % topAdj) : 0,
      left: leftAdj ? (left - left % leftAdj) : 0,
    });
  }

  render() {
    const boxSty = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '300px',
      width: '500px',
      border: '1px solid black',
    };

    const itemSty = {
      display: 'flex',
      width: '100px',
      height: '100px',
      border: '1px solid black',
      cursor: 'pointer',
      position: 'relative',
    }

    return (
      <div
        id="box"
        style={boxSty}
      >
        <div
          className="item"
          style={itemSty}
        >
          hi
        </div>
        <div
          className="item"
          style={itemSty}
        >
          guy
        </div>
      </div>
    );
  }
}

export default DragBox;
import React from 'react';
import {
  ContentBox,
} from '../../components/ContentBox';
import {LabeledInput} from '../../components/LabeledInput';
import {AutoSizer, MultiGrid} from 'react-virtualized';
// import styles from './ResultTable.css';
import './ResultTable.css';

const STYLE = {
  border: '1px solid #ddd',
};
const STYLE_BOTTOM_LEFT_GRID = {
  borderRight: '2px solid #aaa',
  backgroundColor: '#f7f7f7',
};
const STYLE_TOP_LEFT_GRID = {
  borderBottom: '2px solid #aaa',
  borderRight: '2px solid #aaa',
  fontWeight: 'bold',
};
const STYLE_TOP_RIGHT_GRID = {
  borderBottom: '2px solid #aaa',
  fontWeight: 'bold',
};

export default class MultiGridExample extends React.PureComponent {
  // static contextTypes = {
  //   list: PropTypes.instanceOf(Immutable.List).isRequired,
  // };

  constructor(props, context) {
    super(props, context);

    this.state = {
      fixedColumnCount: 1,
      fixedRowCount: 1,
      scrollToColumn: 0,
      scrollToRow: 0,
      
      tableHeight: 0,
    };

    this._cellRenderer = this._cellRenderer.bind(this);
    this._handleWindowResize = this._handleWindowResize.bind(this);
    this._onFixedColumnCountChange = this._createEventHandler(
      'fixedColumnCount',
    );
    this._onFixedRowCountChange = this._createEventHandler('fixedRowCount');
    this._onScrollToColumnChange = this._createEventHandler('scrollToColumn');
    this._onScrollToRowChange = this._createEventHandler('scrollToRow');
    
  }

  _handleWindowResize() {
    this.setState({ tableHeight: window.innerHeight - 66 })
  }

  componentDidMount() {
    this._handleWindowResize()
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  render() {
    return (
      <ContentBox>
        {/* <ContentBoxHeader
          text="MultiGrid"
          sourceLink="https://github.com/bvaughn/react-virtualized/blob/master/source/MultiGrid/MultiGrid.example.js"
          docsLink="https://github.com/bvaughn/react-virtualized/blob/master/docs/MultiGrid.md"
        /> */}

        {/* <ContentBoxParagraph>
          This component stitches together several grids to provide a fixed
          column/row interface.
        </ContentBoxParagraph> */}

        {/* <InputRow>
          {this._createLabeledInput(
            'fixedColumnCount',
            this._onFixedColumnCountChange,
          )}
          {this._createLabeledInput(
            'fixedRowCount',
            this._onFixedRowCountChange,
          )}
          {this._createLabeledInput(
            'scrollToColumn',
            this._onScrollToColumnChange,
          )}
          {this._createLabeledInput('scrollToRow', this._onScrollToRowChange)}
        </InputRow> */}

        <AutoSizer disableHeight>
          {({width}) => (
            <MultiGrid
              {...this.state}
              cellRenderer={this._cellRenderer}
              columnWidth={75}
              columnCount={(this.props.list[0] || []).length}
              // columnCount={0}
              enableFixedColumnScroll
              enableFixedRowScroll
              height={this.state.tableHeight}
              rowHeight={40}
              rowCount={this.props.list.length}
              // rowCount={0}
              style={{ ...STYLE, display: this.props.list.length === 0 && 'none' }}
              styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
              styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
              styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
              width={width}
              hideTopRightGridScrollbar
              hideBottomLeftGridScrollbar
            />
          )}
        </AutoSizer>
      </ContentBox>
    );
  }

  _cellRenderer({columnIndex, key, rowIndex, style}) {
    return (
      <div className="RV-Cell" key={key} style={style}>
        {/* {this.props.list.length > 0 ? this.props.list[0][0] : 'NULL'} */}
        {(this.props.list[rowIndex] || [])[columnIndex]}
        {/* {`${rowIndex}--${columnIndex}`} */}
      </div>
    );
  }

  _createEventHandler(property) {
    return event => {
      const value = parseInt(event.target.value, 10) || 0;

      this.setState({
        [property]: value,
      });
    };
  }

  _createLabeledInput(property, eventHandler) {
    const value = this.state[property];

    return (
      <LabeledInput
        label={property}
        name={property}
        onChange={eventHandler}
        value={value}
      />
    );
  }
}
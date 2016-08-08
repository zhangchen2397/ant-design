import * as React from 'react';
import { PropTypes } from 'react';
import RcSelect, { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';

export interface SelectProps {
  prefixCls?: string;
  className?: string;
  size?: string;
  combobox?: boolean;
  notFoundContent?: any;
  showSearch?: boolean;
  transitionName?: string;
  choiceTransitionName?: string;
  multiple?: boolean;
  allowClear?: boolean;
  tags?: boolean;
  onSearch?: (value: string) => any;
  placeholder?: string;
  dropdownMatchSelectWidth?: boolean;
  optionFilterProp?: string;
  optionLabelProp?: string;
  disabled?: boolean;
  defaultActiveFirstOption?: boolean;
  labelInValue?: boolean;
}

export default class Select extends React.Component<SelectProps, any> {
  static Option = Option;
  static OptGroup = OptGroup;

  static defaultProps = {
    prefixCls: 'ant-select',
    showSearch: false,
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.oneOf(['default', 'large', 'small']),
    combobox: PropTypes.bool,
    notFoundContent: PropTypes.any,
    showSearch: PropTypes.bool,
    optionLabelProp: PropTypes.string,
    transitionName: PropTypes.string,
    choiceTransitionName: PropTypes.string,
  };

  static contextTypes = {
    antLocale: PropTypes.object,
  };

  render() {
    let {
      prefixCls,
      className,
      size,
      combobox,
      notFoundContent,
      showSearch,
      optionLabelProp,
    } = this.props;

    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [className]: !!className,
      [`${prefixCls}-show-search`]: showSearch,
    });

    const { antLocale } = this.context;
    if (antLocale && antLocale.Select) {
      notFoundContent = notFoundContent || antLocale.Select.notFoundContent;
    }

    if (combobox) {
      notFoundContent = null;
      // children 带 dom 结构时，无法填入输入框
      optionLabelProp = optionLabelProp || 'value';
    }

    return (
      <RcSelect {...this.props}
        className={cls}
        optionLabelProp={optionLabelProp || 'children'}
        notFoundContent={notFoundContent}
      />
    );
  }
}

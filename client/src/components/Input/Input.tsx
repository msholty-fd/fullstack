import * as React from 'react'
import { View, Text, TextInput, TextInputProps } from 'react-native'
import styled, { css } from 'styled-components'

interface IProps {
  name?: string
  focused?: string
  focusable?: boolean
  ref: React.Ref<TextInput>
}

const Base = styled(TextInput)<IProps>`
  font-family: AvantGardePro;
  background: var(--white);
  padding: 12px 20px;
  box-shadow: 0 13px 27px 0
    rgba(0, 0, 0, ${props => (props.focused && props.focusable ? '0.1' : '0.04')});
  border-radius: 2.67px;
  font-size: 20px;
  font-weight: 900;
  color: var(--dark-blue);
  letter-spacing: -0.91px;
  outline: none;
  transition: box-shadow 0.3s ease;

  ${props =>
    props.focusable &&
    css`
      &:hover {
        box-shadow: 0 13px 27px 0 rgba(0, 0, 0, 0.1);
      }
    `}
`

const Label = styled(Text)`
  font-family: AvantGardePro;
  margin-bottom: 8px;
  font-size: 13.33px;
  font-weight: 900;
  color: var(--dark-blue);
  letter-spacing: -0.61px;
`

interface InputProps extends TextInputProps, IProps {
  style?: any
  inputStyle?: any
  label?: string
  secure?: boolean
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ style, inputStyle, name, label, secure, focusable, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false)
    return (
      <View style={style}>
        {label && <Label>{label}</Label>}
        <Base
          {...props}
          name={name}
          ref={ref}
          style={inputStyle}
          placeholderTextColor="var(--dark-moderate-blue-30)"
          secureTextEntry={secure}
          focused={focused.toString()}
          focusable={focusable}
          onFocus={e => {
            setFocused(true)
            if (props.onFocus) {
              props.onFocus(e)
            }
          }}
          onBlur={e => {
            setFocused(false)
            if (props.onBlur) {
              props.onBlur(e)
            }
          }}
        />
      </View>
    )
  }
)

export default Input

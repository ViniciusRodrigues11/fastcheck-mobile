import styled, {css} from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'

interface ContainerProps{
    isFocused: boolean;
    isErroed: boolean;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    height: 60px;
    padding: 0 16px;
    background: transparent;
    border-radius: 10px;
    margin-bottom: 8px;
    flex-direction: row;
    align-items: center;
    border-width: 2px;
    border-color: #ebebeb;


    ${(props) => props.isErroed && css`
        border-color: #c53030;
    `}

    ${(props) => props.isFocused && css`
        border-color: #666;
    `}

`;

export const TextInput = styled.TextInput`
    flex: 1;
    color: #666;
    font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
    margin-right: 16px;
`;

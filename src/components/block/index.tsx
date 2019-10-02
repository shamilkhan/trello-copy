import React from 'react';
import styled from 'styled-components';
import IBlock from '../../interfaces/IBlock';

const Wrapper = styled.div`
    color: #fff;
`

interface IProps {
    block: IBlock,
}

function Block({ block }: IProps) {
    const { name } = block;
    return (<Wrapper>
        {name}
    </Wrapper>)
}

export default Block;
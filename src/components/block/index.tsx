import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import IBlock from '../../interfaces/IBlock';

const Wrapper = styled.div`
    color: #fff;
`

export default function (block: IBlock) {
    const { name } = block;
    return (
        <Wrapper>
            {name}
        </Wrapper>
    )
}
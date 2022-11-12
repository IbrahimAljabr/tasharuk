import AddCircleIcon from '@mui/icons-material/AddCircle';
import Container from '@mui/material/Container';
import React from 'react';

import TableShare from '../../components/Table/Table';
import { Create } from '../Capabilities/capabilities.style';

function Schema() {

    return (
        <Container >
            <Create>
                <AddCircleIcon />
                <p>Create New Schema</p>
            </Create>
            <TableShare />
        </Container>
    )
}

export default Schema
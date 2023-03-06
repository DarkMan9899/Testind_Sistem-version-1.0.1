import React from 'react';

let style = {

    headCells: {
        style: {
            fontFamily: 'Roboto, MotionPicture, TitilliumWeb, Arial',
            fontSize: "22px",
            fontWeight: 'bolder',
            textAlign: "center",
        },
    },


    rows: {
        style: {
            fontFamily: 'Roboto, MotionPicture, TitilliumWeb, Arial',
            fontSize: "1em",
            fontWeight: 'bolder',
            minHeight: "35px",
            maxHeight: "35px",
            color: "black",
            textAlign: "center",
        },
    },
};

let columns = (state) => [
    {
        name: "First name",
        // selector: "firstName",
        sortable: true,
        searchable: true,
        center: true,
        cell: (row) => (
            <span contentEditable={true} onChange={e => state.setEditFirstName('Jane')}>{row.firstName}</span >
        )

    },
    {
        name: "Last name",
        selector: "lastName",
        sortable: true,
        center: true,
    },
    {
        name: "Email",
        selector: "email",
        sortable: true,
        center: true,
    },
    {
        name: "Password",
        selector: "password",
        center: true,
    }

    // {
    //     name: "Action",
    //     selector: "action",
    //     center: true,
    // }
];


export { style, columns };
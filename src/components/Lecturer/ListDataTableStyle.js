let style = {
    headCells: {
        style: {
            fontFamily: 'Roboto, MotionPicture, TitilliumWeb, Arial',
            fontSize: "22px",
            fontWeight: 'bolder',
            textAlign: "center",
        },
    },

    columns: {
        style: {
            custifyContent: 'center'
        }
    },
    rows: {
        style: {
            fontFamily: 'Roboto, MotionPicture, TitilliumWeb, Arial',
            fontSize: "18px",
            fontWeight: 'bolder',
            minHeight: "35px",
            maxHeight: "35px",
            color: "black",
            textAlign: "center",
        },
    },
};

let columns = [
    {
        name: "First name",
        selector: "firstName",
        sortable: true,
        searchable: true,
        center: true,
    },
    {
        name: "Last name",
        selector: "lastName",
        sortable: true,
        center: true,
        searchable: true
    },
    {
        name: "Allow",
        selector: "allow",
        center: true,
    }
];


export { style, columns };
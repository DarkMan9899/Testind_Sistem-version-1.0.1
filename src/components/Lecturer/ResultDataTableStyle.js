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
            fontSize: "18px",
            fontWeight: 'bolder',
            minHeight: "30px",
            maxHeight: "30px",
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
        name: "Subject",
        selector: "subject",
        sortable: true,
        center: true,
    },
    {
        name: "Score",
        selector: "score",
        sortable: true,
        center: true,
    },
];


export { style, columns };
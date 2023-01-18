import {Fragment, useCallback, useEffect,  useState} from "react";
import {IPilot} from "../../dto/IPilot";
import {styled, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {BaseService} from "../../service/base-service";
import {Circle, Layer, Rect, Stage, Text} from "react-konva";
import moment from "moment";


const StyledArrowDropUpIcon = styled(ArrowDropUpIcon) ({
    fontSize: "2rem",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "darkcyan",
        borderRadius: "3rem"
    }

});
const StyledArrowDropDownIcon = styled(ArrowDropDownIcon) ({
    fontSize: "2rem",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "darkcyan",
        borderRadius: "3rem"
    }
});

const PilotIndex = () => {
    const [allPilots, setAllPilots] = useState([] as IPilot[]);

    const loadData = useCallback(async () => {
        let result = await BaseService.getAll<IPilot>(
            "/Pilots"
        );
        if (result.ok && result.data) {
            sort(result.data)
        }
    }, []);

    const applySorting = (key: string, ascending: boolean) => {
        localStorage.setItem("key", key)
        localStorage.setItem("ascending", String(ascending))
        sort(allPilots)

    }
    const sort = (data: IPilot[]) => {

        const sortedPilots = data.sort((a: any, b: any) => {
            const key = localStorage.getItem("key") || "firstName";
            return (a[key] > b[key]) ? 1 : -1;

        });

        const ascending = localStorage.getItem("ascending");
        setAllPilots(
            ascending === "true" ? sortedPilots : sortedPilots.reverse()
        );

    }
    const getCoordinate = (coordinate: number) => {
        if(coordinate >= 250000){
            coordinate = coordinate / 1000 * 2;
        }else{
            coordinate = coordinate / 1000 / 0.5;
        }
        return coordinate ;
    }

    useEffect(() => {

        setInterval(() => {
            loadData();
        }, 2000);


    }, [loadData]);

    return (
        <div>
            <Stage width={window.innerWidth} height={500}>
                <Layer>
                    <Circle key={"circle"} x={250} y={250} radius={200} stroke={"2px"}/>
                    <Rect key={"nest"} x={245} y={255} width={10} height={10}  fill={"green"}/>
                    <Text
                        fill={"green"}
                        fontSize={18}
                        text="Nest"
                        x={255} y={253}
                    />
                    {allPilots.map((item, index) => (

                        <Fragment key={index}>

                            <Rect key={item.id} x={getCoordinate(item.positionX) - 250} y={getCoordinate(item.positionY) - 250} width={10}
                                  height={10} fill={"red"} />
                            <Text
                                id={item.lastName}
                                fontSize={12}
                                text={item.lastName}
                                x={getCoordinate(item.positionX) + 10 - 250} y={getCoordinate(item.positionY) -250}/>
                        </Fragment>
                    ))}

                </Layer>
            </Stage>
            <Table className="mainTable">
                <TableHead className="tableHeader">
                    <TableRow >
                        <TableCell/>
                        <TableCell >
                            <div className="styledCell">
                                <h2>First Name</h2>
                                <div className="styledArrows">
                                    <div onClick={() => applySorting("firstName", true)}><StyledArrowDropUpIcon className="arrowUp"/></div>
                                    <div onClick={() => applySorting("firstName", false)}><StyledArrowDropDownIcon className="arrowDown"/></div>
                                </div>
                            </div>

                        </TableCell>
                        <TableCell >
                            <div className="styledCell">
                                <h2>Last Name</h2>
                                <div className="styledArrows">
                                    <div onClick={() => applySorting("lastName", true)}><StyledArrowDropUpIcon  className="arrowUp"/></div>
                                    <div onClick={() => applySorting("lastName", false)}><StyledArrowDropDownIcon className="arrowDown"/></div>
                                </div>
                            </div>

                        </TableCell>
                        <TableCell >
                            <h2>Email</h2>
                        </TableCell>
                        <TableCell>
                            <h2>Phone</h2>
                        </TableCell>
                        <TableCell>
                            <h2>Last seen</h2>
                        </TableCell>
                        <TableCell>
                            <div className="styledCell">
                                <h2>Closest distance</h2>
                                <div className="styledArrows">
                                    <div onClick={() => applySorting("distance", true)}><StyledArrowDropUpIcon className="arrowUp"/></div>
                                    <div onClick={() => applySorting("distance", false)}><StyledArrowDropDownIcon className="arrowDown"/></div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <h2>Coordinate X</h2>
                        </TableCell>
                        <TableCell>
                            <h2>Coordinate Y</h2>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allPilots.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.firstName}</TableCell>
                            <TableCell>{item.lastName}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.phoneNumber}</TableCell>
                            <TableCell>{moment(item.time).format("kk:mm:ss DD.MM.YYYY")}</TableCell>
                            <TableCell>{item.distance.toFixed(2)}m</TableCell>
                            <TableCell>{item.positionX}</TableCell>
                            <TableCell>{item.positionY}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PilotIndex;
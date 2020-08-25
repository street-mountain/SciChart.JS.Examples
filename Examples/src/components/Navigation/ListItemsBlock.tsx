import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { TMenuItem } from "../AppRouter/examples";

type TProps = {
    onExpandClick: (id: string) => void;
    checkIsOpened: (id: string) => boolean;
    historyPushPath: (path: string) => void;
    title: string;
    menuItems: TMenuItem[];
    menuItemsId: string;
};

const useStyles = makeStyles((theme) => ({
    listItemText: {
        marginLeft: theme.spacing(1),
    },
    listItemText2: {
        marginLeft: theme.spacing(2),
    },
}));

const ListItemsBlock: React.FC<TProps> = (props) => {
    const classes = useStyles();
    const { onExpandClick, checkIsOpened, historyPushPath, title, menuItems, menuItemsId } = props;

    return (
        <React.Fragment>
            <ListItem button onClick={() => onExpandClick(menuItemsId)}>
                <ListItemText primary={title} />
                {/*{isOpened[MENU_ITEMS_2D_ID] ? <ExpandLess /> : <ExpandMore />}*/}
            </ListItem>
            <Collapse in={checkIsOpened(menuItemsId)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {menuItems.map((el) => (
                        <React.Fragment key={el.item.id}>
                            <ListItem button onClick={() => onExpandClick(el.item.id)}>
                                <ListItemText className={classes.listItemText} primary={el.item.name} />
                                {/*{isOpened[el.item.id] ? <ExpandLess /> : <ExpandMore />}*/}
                            </ListItem>
                            <Collapse in={checkIsOpened(el.item.id)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {el.submenu.map((subEl) => (
                                        <ListItem
                                            key={subEl.id}
                                            selected={location.pathname === subEl.path}
                                            button
                                            onClick={() => historyPushPath(subEl.path)}
                                        >
                                            <ListItemText
                                                className={classes.listItemText2}
                                                primary={subEl.title}
                                                primaryTypographyProps={{ variant: "body2" }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    ))}
                </List>
            </Collapse>
        </React.Fragment>
    );
};

export default ListItemsBlock;

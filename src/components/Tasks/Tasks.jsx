import React, {useEffect, useState} from 'react';
import st from "./Tasks.module.scss"
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import TaskCard from "../TaskCard/TaskCard.jsx";
import boardData from "./../data/board-data.json"

const Tasks = () => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setReady(true);
        }
    }, []);

    const onDragEnd = (result) => {
        const { destination, source } = result;


        if (!destination) {
            return;
        }

        const sourceIndex = parseInt(source.droppableId, 10);
        const destinationIndex = parseInt(destination.droppableId, 10);

        if (sourceIndex === destinationIndex && source.index === destination.index) {
            return;
        }
        const newBoardData = [...boardData];
        const sourceBoard = newBoardData[sourceIndex];
        const [movedItem] = sourceBoard.items.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
            sourceBoard.items.splice(destination.index, 0, movedItem);
        } else {
            const destinationBoard = newBoardData[destinationIndex];
            destinationBoard.items.splice(destination.index, 0, movedItem);
        }

        // Здесь должно быть обновление состояния с newBoardData
        // Например, setBoardData(newBoardData);
    };

    return (
        <>

            <div className={st.tasks}>
                <div className={st.tasks__container}>
                    <div className={st.tasks__box}>
                        <div className={st.tasks__box__cols}>
                            {ready && (
                                <DragDropContext onDragEnd={onDragEnd}>
                                    {boardData.map((board, bIndex) => {
                                        return (
                                            <div key={board.name}>
                                                <Droppable droppableId={bIndex.toString()}>
                                                    {(provided, snapshot) => (
                                                        <div {...provided.droppableProps}
                                                             ref={provided.innerRef}>
                                                            <div className={`${st.tasks__drop} 
                                                 ${snapshot.isDraggingOver && st.tasks__drop__drag}`}>
                                                                <h4 className={st.tasks__title}>
                                                          <span className="">
                                                            {board.name}
                                                          </span>
                                                                </h4>
                                                                <div className={st.tasks__cards}
                                                                     style={{maxHeight:'calc(100vh - 290px)'}}>
                                                                    {board.items.length > 0 &&
                                                                        board.items.map((item, iIndex) => {
                                                                            return (
                                                                                <TaskCard
                                                                                    key={item.id}
                                                                                    data={item}
                                                                                    index={iIndex}
                                                                                    style={{margin: "0.75rem"}}
                                                                                />
                                                                            );
                                                                        })}
                                                                    {provided.placeholder}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Droppable>
                                            </div>
                                        );
                                    })}
                                </DragDropContext>
                            )}

                        </div>


                    </div>
                </div>
            </div>

        </>
    );
};

export default Tasks;
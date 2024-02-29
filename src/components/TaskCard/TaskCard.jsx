import React from 'react';
import {Draggable} from "react-beautiful-dnd";
import st from "./TasksCard.module.scss"
const TaskCard = ({ data, index }) => {
    return (
        <Draggable index={index} draggableId={data.id.toString()}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={st.task_card}>
                    <label className={`${st.label_base} ${data.priority === 0 ? st.priority_high : data.priority === 1 ? st.priority_medium : st.priority_low}`}>
                        {data.priority === 0
                            ? "Low Priority"
                            : data.priority === 1
                                ? "Medium Priority"
                                : "High Priority"}
                    </label>
                    <h5 className={st.task_card__title}>{data.title}</h5>

                </div>

            )}
        </Draggable>
    );
};

export default TaskCard;
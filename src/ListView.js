// function ListView(props) {

// return <>
//       <TopBar
//         showCompleted={showCompleted}
//         sortType={sortType}
//         onShowCompleted={handleShowCompleted}
//         onChangeSortType={handleSortType}
//         onDeleteCompleted={handleDeleteCompletedTasks}
//         onTogglePriorityPopup={handlePriorityPopup}
//         isNarrow={isNarrow}
//         onShowHome={handleShowHome}
//       />
//       <SubBar
//         showCompleted={showCompleted}
//         onShowCompleted={handleShowCompleted}
//         onHideCompleted={handleHideCompleted}
//         onChangeSortType={handleSortType}
//         isNarrow={isNarrow}
//         />
//         <Contents
//           data={data}
//           loading={loading}
//           listEnd={listEnd}
//           sortPriority={sortType}
//           showCompleted={showCompleted}
//           onToggleChecked={handleToggleChecked}
//           onChangePriority={handleChangePriority}
//           onDeleteTask={handleDeleteTask}
//           onChangeText={handleChangeText}
//           lowPriorityIcon={lowPriorityIcon}
//           medPriorityIcon={medPriorityIcon}
//           highPriorityIcon={highPriorityIcon}
//         />
//       <BottomBar onTextInput={addNewTodo} />
//       {priorityPopup ? (
//         <>
//           <Backdrop onClickBackdrop={handlePriorityPopup} />
//           <PriorityPopup
//             lowPriorityIcon={lowPriorityIcon}
//             medPriorityIcon={medPriorityIcon}
//             highPriorityIcon={highPriorityIcon}
//             lowPriorityOptions={lowPriorityOptions}
//             medPriorityOptions={medPriorityOptions}
//             highPriorityOptions={highPriorityOptions}
//             onChangeLowPriorityIcon={setLowPriorityIcon}
//             onChangeMedPriorityIcon={setMedPriorityIcon}
//             onChangeHighPriorityIcon={setHighPriorityIcon}
//           />
//         </>
//       ) : null}
//     </>
// }
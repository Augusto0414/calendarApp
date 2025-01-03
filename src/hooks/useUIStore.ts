import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store/ui";

export const useUIStore = () => {
  const dispatch = useDispatch();

  const { isDateModalOpen } = useSelector((state: RootState) => state.ui);

  const openDateModal = () => dispatch(onOpenDateModal());
  const closeDateModal = () => dispatch(onCloseDateModal());

  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal,
  };
};

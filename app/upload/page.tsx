'use client'
import { useRouter } from "next/navigation";
// components
import MutltiForm from "@/components/form/MultiForm";
import FullOverlayWrap from "@/components/overlayWraps/FullOverlayWrap";
import GameUploadPreview from "@/components/shared/GameUploadPreview";
// hooks
import useOverlay from "@/hooks/useOverlay";
// type
import { GameFormType } from "@/interface";
// remotes
import { uploadGame } from "../remotes/axois/gameAPI";
import { uploadImage } from "../remotes/axois/imageAPI";


export default function GameUploadPage() {
  const route = useRouter();
  const overlay = useOverlay();

  // 게임 업로드
  const createGameData = async (data: GameFormType) => {
    if (data.image instanceof File) {
      const imageURL = await uploadImage(data.image)
      data = { ...data, image: imageURL };
    }
    await uploadGame(data);
    alert('게임을 업로드 하였습니다.');
    route.replace('/');
  }

  // 미리보기 오픈 핸들러
  const handleClick = (data: GameFormType) => {
    overlay.open((isOpen, close) => (
      <FullOverlayWrap isOpen={isOpen} close={close}>
        <GameUploadPreview game={data} onSubmit={() => createGameData(data)}/>
      </FullOverlayWrap>
    ));
  };

  return (
    <div className="page">
      <div className="page__header">
        <h2>게임 수정</h2>
      </div>
      <MutltiForm onClick={handleClick} />
    </div>
  );
}
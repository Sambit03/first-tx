import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameInput,
  FrameReducer,
  NextServerPageProps,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";

type State = {
  address?: "";
  total_button_presses: number;
};

const initialState = { address: "", total_button_presses: 0 };

const reducer: FrameReducer<State> = (state) => {
  return {
    total_button_presses: state.total_button_presses + 1,
  };
};

// This is a react server component only
export default async function Home({ searchParams }: NextServerPageProps) {
  const previousFrame = getPreviousFrame(searchParams);

  const frameMessage = await getFrameMessage(previousFrame.postBody);
  console.log("frameMessage:", frameMessage);

  // if (frameMessage && !frameMessage?.isValid) {
  //   throw new Error("Invalid frame payload");
  // }

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame
  );

  return (
    <div className="p-4">
      <FrameContainer
        postUrl="/frames/route"
        pathname="/frames"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage aspectRatio="1.91:1">
          <div tw="w-full h-full bg-slate-700 text-white justify-center items-center flex flex-col">
            <div tw="flex flex-row">Whats your first tx?</div>
            {frameMessage && (
              <div tw="flex flex-col">
                <div tw="flex">
                  Requester is @{frameMessage.requesterUserData?.username}{" "}
                </div>
              </div>
            )}
          </div>
        </FrameImage>
        <FrameInput text="Enter your address" />
        <FrameButton>{`Let's Goooo`}</FrameButton>
      </FrameContainer>
    </div>
  );
}

type Heroes = "Hulk" | "Capt" | "Thor"; //Union으로 감은 타입 별칭
type HeroAges = { [K in Heroes]: number };
//새로운 타입으로 변환
const ages: HeroAges = {
  Hulk: 33,
  Capt: 100,
  Thor: 1000,
};

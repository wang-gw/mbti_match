"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Sparkles, Users, ArrowRight } from "lucide-react"

type MBTIType =
  | "INTJ"
  | "INTP"
  | "ENTJ"
  | "ENTP"
  | "INFJ"
  | "INFP"
  | "ENFJ"
  | "ENFP"
  | "ISTJ"
  | "ISFJ"
  | "ESTJ"
  | "ESFJ"
  | "ISTP"
  | "ISFP"
  | "ESTP"
  | "ESFP"

interface MatchResult {
  bestMatch: MBTIType
  compatibility: number
  description: string
  reason: string
}

const mbtiTypes: MBTIType[] = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
]

const mbtiDescriptions: Record<MBTIType, string> = {
  INTJ: "전략가 - 독립적이고 창의적인 사고를 가진 완벽주의자",
  INTP: "논리술사 - 지적 호기심이 많고 분석적인 사고를 하는 혁신가",
  ENTJ: "통솔자 - 카리스마 있고 목표 지향적인 천연 리더",
  ENTP: "변론가 - 창의적이고 활발한 토론을 즐기는 혁신가",
  INFJ: "옹호자 - 이상주의적이고 원칙을 중시하는 통찰력 있는 사람",
  INFP: "중재자 - 열정적이고 창의적인 자유로운 영혼",
  ENFJ: "선도자 - 카리스마 있고 영감을 주는 천연 리더",
  ENFP: "활동가 - 열정적이고 창의적인 자유로운 정신",
  ISTJ: "현실주의자 - 실용적이고 사실에 기반한 신뢰할 수 있는 사람",
  ISFJ: "수호자 - 따뜻하고 헌신적인 보호자",
  ESTJ: "경영자 - 조직적이고 실용적인 관리자",
  ESFJ: "집정관 - 사교적이고 배려심 많은 협력자",
  ISTP: "만능재주꾼 - 실용적이고 현실적인 문제 해결사",
  ISFP: "모험가 - 유연하고 매력적인 예술가",
  ESTP: "사업가 - 활동적이고 현실적인 실용주의자",
  ESFP: "연예인 - 활발하고 열정적인 자유로운 영혼",
}

const compatibilityData: Record<MBTIType, MatchResult> = {
  INTJ: {
    bestMatch: "ENFP",
    compatibility: 95,
    description: "창의적이고 열정적인 ENFP와 완벽한 조화를 이룹니다",
    reason: "ENFP의 자유로운 에너지가 INTJ의 체계적인 사고와 균형을 이루며, 서로의 부족한 부분을 채워줍니다.",
  },
  INTP: {
    bestMatch: "ENFJ",
    compatibility: 92,
    description: "따뜻하고 이해심 많은 ENFJ와 깊은 연결을 만듭니다",
    reason: "ENFJ의 감정적 지지가 INTP의 논리적 사고를 보완하며, 지적인 대화를 통해 성장할 수 있습니다.",
  },
  ENTJ: {
    bestMatch: "INFP",
    compatibility: 90,
    description: "감성적이고 창의적인 INFP와 완벽한 균형을 이룹니다",
    reason: "INFP의 따뜻함과 창의성이 ENTJ의 강한 리더십을 부드럽게 만들어 조화로운 관계를 형성합니다.",
  },
  ENTP: {
    bestMatch: "INFJ",
    compatibility: 93,
    description: "신비롭고 통찰력 있는 INFJ와 깊은 정신적 연결을 만듭니다",
    reason: "INFJ의 깊은 통찰력이 ENTP의 창의적 아이디어를 현실화하는데 도움을 주며, 서로 영감을 줍니다.",
  },
  INFJ: {
    bestMatch: "ENTP",
    compatibility: 93,
    description: "창의적이고 활발한 ENTP와 완벽한 조화를 이룹니다",
    reason: "ENTP의 활발한 에너지가 INFJ의 내향적 성향을 균형있게 만들며, 깊은 대화를 나눌 수 있습니다.",
  },
  INFP: {
    bestMatch: "ENTJ",
    compatibility: 90,
    description: "강인하고 목표 지향적인 ENTJ와 완벽한 균형을 만듭니다",
    reason: "ENTJ의 확고한 리더십이 INFP에게 안정감을 주며, INFP의 감성이 ENTJ를 더욱 인간적으로 만듭니다.",
  },
  ENFJ: {
    bestMatch: "INTP",
    compatibility: 92,
    description: "논리적이고 독창적인 INTP와 깊은 이해를 나눕니다",
    reason: "ENFJ의 따뜻한 배려가 INTP의 내향적 성향을 이해하며, 지적인 성장을 함께 할 수 있습니다.",
  },
  ENFP: {
    bestMatch: "INTJ",
    compatibility: 95,
    description: "신중하고 계획적인 INTJ와 완벽한 조화를 이룹니다",
    reason: "INTJ의 체계적인 사고가 ENFP의 자유로운 에너지에 방향성을 제공하며, 서로를 성장시킵니다.",
  },
  ISTJ: {
    bestMatch: "ESFP",
    compatibility: 88,
    description: "활발하고 즐거운 ESFP와 완벽한 균형을 만듭니다",
    reason: "ESFP의 밝은 에너지가 ISTJ의 진중함을 밝게 만들며, 안정적이면서도 즐거운 관계를 형성합니다.",
  },
  ISFJ: {
    bestMatch: "ESTP",
    compatibility: 87,
    description: "활동적이고 현실적인 ESTP와 좋은 조화를 이룹니다",
    reason: "ESTP의 활발함이 ISFJ의 배려심과 만나 서로를 보완하며, 실용적이면서도 따뜻한 관계를 만듭니다.",
  },
  ESTJ: {
    bestMatch: "ISFP",
    compatibility: 86,
    description: "예술적이고 유연한 ISFP와 균형잡힌 관계를 만듭니다",
    reason: "ISFP의 창의성과 유연함이 ESTJ의 체계적인 성향을 부드럽게 만들어 조화로운 관계를 형성합니다.",
  },
  ESFJ: {
    bestMatch: "ISTP",
    compatibility: 85,
    description: "실용적이고 독립적인 ISTP와 좋은 균형을 이룹니다",
    reason: "ISTP의 실용적 문제해결 능력이 ESFJ의 배려심과 만나 서로를 보완하는 안정적인 관계를 만듭니다.",
  },
  ISTP: {
    bestMatch: "ESFJ",
    compatibility: 85,
    description: "따뜻하고 사교적인 ESFJ와 완벽한 조화를 이룹니다",
    reason: "ESFJ의 따뜻한 배려가 ISTP의 독립적 성향을 이해하며, 실용적이면서도 따뜻한 관계를 형성합니다.",
  },
  ISFP: {
    bestMatch: "ESTJ",
    compatibility: 86,
    description: "체계적이고 신뢰할 수 있는 ESTJ와 안정적인 관계를 만듭니다",
    reason: "ESTJ의 체계적인 계획성이 ISFP의 자유로운 창의성에 안정감을 주며, 서로를 성장시킵니다.",
  },
  ESTP: {
    bestMatch: "ISFJ",
    compatibility: 87,
    description: "따뜻하고 헌신적인 ISFJ와 완벽한 균형을 이룹니다",
    reason: "ISFJ의 따뜻한 헌신이 ESTP의 활발한 에너지를 안정적으로 만들며, 서로를 보완하는 관계를 형성합니다.",
  },
  ESFP: {
    bestMatch: "ISTJ",
    compatibility: 88,
    description: "신뢰할 수 있고 안정적인 ISTJ와 완벽한 조화를 이룹니다",
    reason: "ISTJ의 안정적인 성향이 ESFP의 자유로운 에너지에 든든한 기반을 제공하며, 균형잡힌 관계를 만듭니다.",
  },
}

export default function MBTILoveMatch() {
  const [selectedMBTI, setSelectedMBTI] = useState<MBTIType | "">("")
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<MatchResult | null>(null)
  const [mode, setMode] = useState<"single" | "couple">("single")
  const [coupleMBTI1, setCoupleMBTI1] = useState<MBTIType | "">("")
  const [coupleMBTI2, setCoupleMBTI2] = useState<MBTIType | "">("")
  const [coupleResult, setCoupleResult] = useState<{
    compatibility: number
    description: string
    reason: string
    mutualStrengths: string
  } | null>(null)

  const handleMBTISelect = (mbti: MBTIType) => {
    setSelectedMBTI(mbti)
    setShowResult(false)
  }

  const findMatch = () => {
    if (selectedMBTI) {
      setResult(compatibilityData[selectedMBTI])
      setShowResult(true)
    }
  }

  const calculateCoupleCompatibility = (mbti1: MBTIType, mbti2: MBTIType) => {
    // 양방향 궁합 확인
    const match1to2 = compatibilityData[mbti1]
    const match2to1 = compatibilityData[mbti2]

    let compatibility = 70 // 기본 궁합도
    let description = ""
    let reason = ""
    let mutualStrengths = ""

    // 완벽한 매치인 경우
    if (match1to2.bestMatch === mbti2) {
      compatibility = match1to2.compatibility
      description = `${mbti1}과 ${mbti2}는 완벽한 궁합입니다! 💕`
      reason = match1to2.reason
      mutualStrengths = "서로를 완벽하게 보완하며, 깊은 이해와 성장을 함께 할 수 있는 관계입니다."
    } else if (match2to1.bestMatch === mbti1) {
      compatibility = match2to1.compatibility
      description = `${mbti2}와 ${mbti1}는 완벽한 궁합입니다! 💕`
      reason = match2to1.reason
      mutualStrengths = "서로를 완벽하게 보완하며, 깊은 이해와 성장을 함께 할 수 있는 관계입니다."
    } else {
      // 일반적인 궁합 계산
      const similarities = calculateSimilarities(mbti1, mbti2)
      compatibility = 60 + similarities * 5

      if (compatibility >= 85) {
        description = `${mbti1}과 ${mbti2}는 매우 좋은 궁합입니다! ✨`
        reason = "서로 다른 점들이 조화롭게 어우러져 균형잡힌 관계를 만들 수 있습니다."
        mutualStrengths = "서로의 차이점을 존중하며 함께 성장할 수 있는 관계입니다."
      } else if (compatibility >= 70) {
        description = `${mbti1}과 ${mbti2}는 좋은 궁합입니다! 💫`
        reason = "약간의 차이는 있지만, 서로를 이해하고 배려한다면 좋은 관계를 만들 수 있습니다."
        mutualStrengths = "서로의 다른 관점을 통해 새로운 것을 배우고 성장할 수 있습니다."
      } else {
        description = `${mbti1}과 ${mbti2}는 노력이 필요한 관계입니다. 💪`
        reason = "성격의 차이가 있지만, 서로를 이해하려는 노력으로 특별한 관계를 만들 수 있습니다."
        mutualStrengths = "서로 다른 강점을 인정하고 배우면서 더욱 성숙한 관계로 발전할 수 있습니다."
      }
    }

    return { compatibility, description, reason, mutualStrengths }
  }

  const calculateSimilarities = (mbti1: MBTIType, mbti2: MBTIType) => {
    let similarities = 0
    for (let i = 0; i < 4; i++) {
      if (mbti1[i] === mbti2[i]) similarities++
    }
    return similarities
  }

  const findCoupleMatch = () => {
    if (coupleMBTI1 && coupleMBTI2) {
      const result = calculateCoupleCompatibility(coupleMBTI1, coupleMBTI2)
      setCoupleResult(result)
      setShowResult(true)
    }
  }

  const resetMatch = () => {
    setSelectedMBTI("")
    setCoupleMBTI1("")
    setCoupleMBTI2("")
    setShowResult(false)
    setResult(null)
    setCoupleResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="py-8 text-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-pink-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              MBTI 연애 궁합
            </h1>
            <Heart className="h-8 w-8 text-pink-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            나만의 완벽한 파트너를 찾거나, 두 사람의 궁합을 확인해보세요! 💕
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!showResult ? (
            /* Input Section */
            <div className="space-y-6">
              {/* Mode Selection */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-xl">어떤 방식으로 궁합을 확인하시겠어요?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 justify-center">
                    <Button
                      variant={mode === "single" ? "default" : "outline"}
                      onClick={() => setMode("single")}
                      className={`px-8 py-4 text-lg ${
                        mode === "single" ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" : ""
                      }`}
                    >
                      💝 나의 이상형 찾기
                    </Button>
                    <Button
                      variant={mode === "couple" ? "default" : "outline"}
                      onClick={() => setMode("couple")}
                      className={`px-8 py-4 text-lg ${
                        mode === "couple" ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" : ""
                      }`}
                    >
                      💕 커플 궁합 확인
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {mode === "single" ? (
                /* Single Mode */
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Sparkles className="h-6 w-6 text-purple-500" />
                      <CardTitle className="text-2xl">당신의 MBTI를 선택해주세요</CardTitle>
                      <Sparkles className="h-6 w-6 text-purple-500" />
                    </div>
                    <CardDescription className="text-base">당신과 가장 잘 맞는 이상형을 찾아드릴게요</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {mbtiTypes.map((mbti) => (
                        <Button
                          key={mbti}
                          variant={selectedMBTI === mbti ? "default" : "outline"}
                          className={`h-16 text-lg font-semibold transition-all duration-200 ${
                            selectedMBTI === mbti
                              ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105"
                              : "hover:scale-105 hover:shadow-md"
                          }`}
                          onClick={() => handleMBTISelect(mbti)}
                        >
                          {mbti}
                        </Button>
                      ))}
                    </div>

                    {selectedMBTI && (
                      <div className="text-center space-y-4">
                        <div className="p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg">
                          <p className="text-gray-700">
                            <strong>{selectedMBTI}</strong>: {mbtiDescriptions[selectedMBTI]}
                          </p>
                        </div>
                        <Button
                          size="lg"
                          onClick={findMatch}
                          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
                        >
                          💕 완벽한 짝 찾기 💕
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                /* Couple Mode */
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Heart className="h-6 w-6 text-red-500" />
                      <CardTitle className="text-2xl">두 사람의 MBTI를 선택해주세요</CardTitle>
                      <Heart className="h-6 w-6 text-red-500" />
                    </div>
                    <CardDescription className="text-base">두 MBTI 타입의 궁합을 확인해드릴게요</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* First Person */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-center text-blue-600">첫 번째 사람</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {mbtiTypes.map((mbti) => (
                          <Button
                            key={`person1-${mbti}`}
                            variant={coupleMBTI1 === mbti ? "default" : "outline"}
                            className={`h-14 text-base font-semibold transition-all duration-200 ${
                              coupleMBTI1 === mbti
                                ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg scale-105"
                                : "hover:scale-105 hover:shadow-md"
                            }`}
                            onClick={() => setCoupleMBTI1(mbti)}
                          >
                            {mbti}
                          </Button>
                        ))}
                      </div>
                      {coupleMBTI1 && (
                        <div className="p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>{coupleMBTI1}</strong>: {mbtiDescriptions[coupleMBTI1]}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* VS Divider */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center space-x-4">
                        <div className="h-px bg-gray-300 w-16"></div>
                        <span className="text-2xl font-bold text-purple-600">VS</span>
                        <div className="h-px bg-gray-300 w-16"></div>
                      </div>
                    </div>

                    {/* Second Person */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-center text-pink-600">두 번째 사람</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {mbtiTypes.map((mbti) => (
                          <Button
                            key={`person2-${mbti}`}
                            variant={coupleMBTI2 === mbti ? "default" : "outline"}
                            className={`h-14 text-base font-semibold transition-all duration-200 ${
                              coupleMBTI2 === mbti
                                ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg scale-105"
                                : "hover:scale-105 hover:shadow-md"
                            }`}
                            onClick={() => setCoupleMBTI2(mbti)}
                          >
                            {mbti}
                          </Button>
                        ))}
                      </div>
                      {coupleMBTI2 && (
                        <div className="p-3 bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>{coupleMBTI2}</strong>: {mbtiDescriptions[coupleMBTI2]}
                          </p>
                        </div>
                      )}
                    </div>

                    {coupleMBTI1 && coupleMBTI2 && (
                      <div className="text-center">
                        <Button
                          size="lg"
                          onClick={findCoupleMatch}
                          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 text-lg"
                        >
                          💕 두 사람의 궁합 확인하기 💕
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            /* Result Section */
            <div className="space-y-6">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center pb-6">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Heart className="h-8 w-8 text-red-500 animate-pulse" />
                    <CardTitle className="text-3xl bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                      {mode === "single" ? "완벽한 매치를 찾았어요!" : "두 사람의 궁합 결과"}
                    </CardTitle>
                    <Heart className="h-8 w-8 text-red-500 animate-pulse" />
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  {mode === "single" ? (
                    /* Single Mode Result */
                    <>
                      <div className="flex items-center justify-center space-x-8">
                        <div className="text-center">
                          <Badge variant="secondary" className="text-lg px-4 py-2 mb-2 bg-blue-100 text-blue-800">
                            {selectedMBTI}
                          </Badge>
                          <p className="text-sm text-gray-600">당신</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Heart className="h-6 w-6 text-red-500" />
                          <span className="text-2xl">+</span>
                          <Heart className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="text-center">
                          <Badge variant="secondary" className="text-lg px-4 py-2 mb-2 bg-pink-100 text-pink-800">
                            {result?.bestMatch}
                          </Badge>
                          <p className="text-sm text-gray-600">완벽한 파트너</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                          <Users className="h-6 w-6 text-purple-600" />
                          <h3 className="text-xl font-semibold text-purple-800">궁합도</h3>
                        </div>
                        <div className="text-4xl font-bold text-red-500 mb-2">{result?.compatibility}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                          <div
                            className="bg-gradient-to-r from-red-400 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${result?.compatibility}%` }}
                          ></div>
                        </div>
                        <p className="text-lg text-gray-700 mb-4">{result?.description}</p>
                        <div className="bg-white/70 p-4 rounded-lg">
                          <p className="text-gray-600 leading-relaxed">{result?.reason}</p>
                        </div>
                      </div>

                      {result?.bestMatch && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>{result.bestMatch}</strong> 타입에 대해 더 알아보세요:
                          </p>
                          <p className="text-gray-700">{mbtiDescriptions[result.bestMatch]}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    /* Couple Mode Result */
                    <>
                      <div className="flex items-center justify-center space-x-8">
                        <div className="text-center">
                          <Badge variant="secondary" className="text-lg px-4 py-2 mb-2 bg-blue-100 text-blue-800">
                            {coupleMBTI1}
                          </Badge>
                          <p className="text-sm text-gray-600">첫 번째 사람</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Heart className="h-6 w-6 text-red-500" />
                          <span className="text-2xl">💕</span>
                          <Heart className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="text-center">
                          <Badge variant="secondary" className="text-lg px-4 py-2 mb-2 bg-pink-100 text-pink-800">
                            {coupleMBTI2}
                          </Badge>
                          <p className="text-sm text-gray-600">두 번째 사람</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                          <Users className="h-6 w-6 text-purple-600" />
                          <h3 className="text-xl font-semibold text-purple-800">두 사람의 궁합도</h3>
                        </div>
                        <div className="text-4xl font-bold text-purple-600 mb-2">{coupleResult?.compatibility}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                          <div
                            className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${coupleResult?.compatibility}%` }}
                          ></div>
                        </div>
                        <p className="text-lg text-gray-700 mb-4">{coupleResult?.description}</p>
                        <div className="bg-white/70 p-4 rounded-lg mb-4">
                          <p className="text-gray-600 leading-relaxed">{coupleResult?.reason}</p>
                        </div>
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-orange-800 mb-2">💪 함께 성장할 수 있는 포인트</h4>
                          <p className="text-orange-700 text-sm">{coupleResult?.mutualStrengths}</p>
                        </div>
                      </div>
                    </>
                  )}

                  <Button
                    onClick={resetMatch}
                    variant="outline"
                    size="lg"
                    className="border-2 border-purple-300 hover:bg-purple-50 text-purple-700 px-8 bg-transparent"
                  >
                    다시 테스트하기
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500">
        <div className="container mx-auto px-4">
          <p className="text-sm">
            💝 MBTI 궁합은 참고용이며, 진정한 사랑은 서로를 이해하고 배려하는 마음에서 시작됩니다 💝
          </p>
        </div>
      </footer>
    </div>
  )
}

export type Language = 'ko' | 'en';

export interface Translations {
  nav: {
    home: string;
    about: string;
    philosophy: string;
    leadership: string;
    profile: string;
    location: string;
    history: string;
    services: string;
    googleAds: string;
    naverAds: string;
    metaAds: string;
    kakaoAds: string;
    blog: string;
    portfolio: string;
    contact: string;
    careers: string;
    signIn: string;
    dashboard: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  services: {
    title: string;
    subtitle: string;
    googleAds: {
      title: string;
      description: string;
      heroTitle: string;
      heroDescription: string;
      brandName: string;
      dashboard: string;
      serviceTypes: {
        title: string;
        subtitle: string;
        search: {
          title: string;
          description: string;
          features: string[];
        };
        display: {
          title: string;
          description: string;
          features: string[];
        };
        shopping: {
          title: string;
          description: string;
          features: string[];
        };
        youtube: {
          title: string;
          description: string;
          features: string[];
        };
      };
      benefits: {
        title: string;
        targeting: {
          title: string;
          description: string;
        };
        realtime: {
          title: string;
          description: string;
        };
        costEffective: {
          title: string;
          description: string;
        };
        global: {
          title: string;
          description: string;
        };
      };
      caseStudy: {
        title: string;
        company: string;
        challenge: string;
        solution: string;
        resultsTitle: string;
      };
    };
    naverAds: {
      title: string;
      description: string;
      heroTitle: string;
      heroDescription: string;
      brandName: string;
      dashboard: string;
      serviceTypes: {
        title: string;
        subtitle: string;
        powerlink: {
          title: string;
          description: string;
          features: string[];
        };
        brand: {
          title: string;
          description: string;
          features: string[];
        };
        shopping: {
          title: string;
          description: string;
          features: string[];
        };
        display: {
          title: string;
          description: string;
          features: string[];
        };
      };
      benefits: {
        title: string;
        domestic: {
          title: string;
          description: string;
        };
        korean: {
          title: string;
          description: string;
        };
        platform: {
          title: string;
          description: string;
        };
        content: {
          title: string;
          description: string;
        };
      };
      caseStudy: {
        title: string;
        company: string;
        challenge: string;
        solution: string;
        resultsTitle: string;
      };
    };
    metaAds: {
      title: string;
      description: string;
      heroTitle: string;
      heroDescription: string;
      brandName: string;
      dashboard: string;
      serviceTypes: {
        title: string;
        subtitle: string;
        facebook: {
          title: string;
          description: string;
          features: string[];
        };
        instagram: {
          title: string;
          description: string;
          features: string[];
        };
        messenger: {
          title: string;
          description: string;
          features: string[];
        };
        audience: {
          title: string;
          description: string;
          features: string[];
        };
      };
      benefits: {
        title: string;
        global: {
          title: string;
          description: string;
        };
        targeting: {
          title: string;
          description: string;
        };
        creative: {
          title: string;
          description: string;
        };
        engagement: {
          title: string;
          description: string;
        };
      };
      caseStudy: {
        title: string;
        company: string;
        challenge: string;
        solution: string;
        resultsTitle: string;
      };
    };
    kakaoAds: {
      title: string;
      description: string;
      heroTitle: string;
      heroDescription: string;
      brandName: string;
      dashboard: string;
      serviceTypes: {
        title: string;
        subtitle: string;
        talk: {
          title: string;
          description: string;
          features: string[];
        };
        bizboard: {
          title: string;
          description: string;
          features: string[];
        };
        display: {
          title: string;
          description: string;
          features: string[];
        };
        shopping: {
          title: string;
          description: string;
          features: string[];
        };
      };
      benefits: {
        title: string;
        daily: {
          title: string;
          description: string;
        };
        messaging: {
          title: string;
          description: string;
        };
        mobile: {
          title: string;
          description: string;
        };
        local: {
          title: string;
          description: string;
        };
      };
      caseStudy: {
        title: string;
        company: string;
        challenge: string;
        solution: string;
        resultsTitle: string;
      };
    };
    learnMore: string;
    contactCta: string;
    portfolioCta: string;
  };
  stats: {
    title: string;
    subtitle: string;
    projects: string;
    roas: string;
    revenue: string;
    satisfaction: string;
  };
  portfolio: {
    title: string;
    subtitle: string;
    viewAll: string;
    viewCase: string;
    clients: {
      title: string;
      subtitle: string;
      description: string;
      successfulClients: string;
      successfulCampaigns: string;
      averageGrowth: string;
      viewMore: string;
    };
  };
  about: {
    title: string;
    description: string;
    feature1: {
      title: string;
      description: string;
    };
    feature2: {
      title: string;
      description: string;
    };
    feature3: {
      title: string;
      description: string;
    };
    learnMore: string;
  };
  blog: {
    title: string;
    subtitle: string;
    viewAll: string;
    readMore: string;
    insights: {
      title: string;
      subtitle: string;
      description: string;
      viewMore: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      budgetLabel: string;
      messageLabel: string;
      messagePlaceholder: string;
      privacyLabel: string;
      privacyLink: string;
      submitButton: string;
      responseTime: string;
      success: string;
      error: string;
    };
    phone: {
      title: string;
      value: string;
      hours: string;
    };
    email: {
      title: string;
      value: string;
      response: string;
    };
    location: {
      title: string;
      value: string;
      link: string;
    };
  };
  footer: {
    company: {
      name: string;
      description: string;
      title: string;
      about: string;
      philosophy: string;
      leadership: string;
      careers: string;
    };
    services: {
      title: string;
      googleAds: string;
      naverAds: string;
      metaAds: string;
      kakaoAds: string;
    };
    resources: {
      title: string;
      blog: string;
      portfolio: string;
      contact: string;
      location: string;
    };
    legal: {
      privacy: string;
      terms: string;
    };
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  ko: {
    nav: {
      home: '홈',
      about: '회사소개',
      philosophy: '기업철학',
      leadership: '회사인사말',
      profile: '회사소개',
      location: '위치안내',
      history: '연혁',
      services: '서비스',
      googleAds: '구글 광고',
      naverAds: '네이버 광고',
      metaAds: '메타 광고',
      kakaoAds: '카카오 광고',
      blog: '블로그',
      portfolio: '포트폴리오',
      contact: '프로젝트문의',
      careers: '채용',
      signIn: '로그인',
      dashboard: '대시보드',
    },
    hero: {
      title: '데이터 기반\n퍼포먼스 마케팅\n전문 에이전시',
      subtitle: '구글, 네이버, 메타, 카카오 광고를 통해\n매출 성장과 브랜드 확장을 실현합니다',
      cta1: '무료 컨설팅 받기',
      cta2: '포트폴리오 보기',
    },
    services: {
      title: '전문 마케팅 서비스',
      subtitle: '각 플랫폼의 특성을 깊이 이해하고, 데이터 분석을 통해 최적의 성과를 창출합니다',
      googleAds: {
        title: '구글 광고',
        description: '검색광고부터 디스플레이, 쇼핑광고까지 구글 생태계를 활용한 통합 마케팅',
        heroTitle: '구글 광고로 더 많은 고객을 만나보세요',
        heroDescription: '전 세계 90억 명이 사용하는 구글에서 정확한 타겟 고객에게 도달하세요. 검색, 디스플레이, 쇼핑, YouTube까지 모든 구글 광고 솔루션을 제공합니다.',
        brandName: 'Google Ads',
        dashboard: 'Google Ads 대시보드',
        serviceTypes: {
          title: '구글 광고 서비스',
          subtitle: '다양한 구글 광고 솔루션으로 최적의 마케팅 성과를 달성하세요',
          search: {
            title: '검색 광고 (Search Ads)',
            description: '구글 검색결과 상단에 노출되는 텍스트 광고로, 구매 의도가 높은 고객을 타겟팅합니다.',
            features: ['키워드 타겟팅', '광고 확장', '자동 입찰', '품질평가 최적화']
          },
          display: {
            title: '디스플레이 광고 (Display Ads)',
            description: '구글 파트너 사이트와 YouTube에 표시되는 이미지/동영상 광고입니다.',
            features: ['시각적 크리에이티브', '리타겟팅', '인구통계 타겟팅', '플레이스먼트 선택']
          },
          shopping: {
            title: '쇼핑 광고 (Shopping Ads)',
            description: '제품 이미지와 가격이 포함된 광고로 이커머스에 최적화되어 있습니다.',
            features: ['제품 피드 관리', '가격 비교', '시각적 어필', '직접 구매 유도']
          },
          youtube: {
            title: '유튜브 광고 (YouTube Ads)',
            description: '세계 2위 검색엔진인 YouTube에서 동영상 콘텐츠로 브랜드를 알립니다.',
            features: ['영상 콘텐츠', '스키퍼블/논스키퍼블', '인플루언서 협업', '브랜드 인지도']
          }
        },
        benefits: {
          title: '구글 광고의 장점',
          targeting: {
            title: '정확한 타겟팅',
            description: '검색 키워드, 위치, 연령, 관심사 등 다양한 기준으로 정확한 고객을 타겟팅합니다.'
          },
          realtime: {
            title: '실시간 성과 측정',
            description: '클릭, 노출, 전환율 등 모든 지표를 실시간으로 확인하고 최적화할 수 있습니다.'
          },
          costEffective: {
            title: '비용 효율성',
            description: '설정한 예산 내에서 최대 성과를 낼 수 있도록 자동 입찰 시스템이 최적화됩니다.'
          },
          global: {
            title: '글로벌 도달',
            description: '전 세계 90억 명의 구글 사용자에게 광고를 노출할 수 있습니다.'
          }
        },
        caseStudy: {
          title: '성공 사례',
          company: '패션 이커머스 A사',
          challenge: '신규 고객 획득과 매출 증대',
          solution: '검색광고 + 쇼핑광고 + 리마케팅 통합 전략',
          resultsTitle: '달성 결과'
        }
      },
      naverAds: {
        title: '네이버 광고',
        description: '국내 최대 검색엔진 네이버에서의 검색광고, 쇼핑광고, 브랜드검색 최적화',
        heroTitle: '네이버 광고로 국내 고객을 정확히 공략하세요',
        heroDescription: '국내 검색 점유율 1위 네이버에서 한국 고객에게 최적화된 마케팅을 진행하세요. 파워링크, 브랜드검색, 쇼핑검색까지 모든 네이버 광고 솔루션을 제공합니다.',
        brandName: 'Naver Ads',
        dashboard: 'Naver Ads 대시보드',
        serviceTypes: {
          title: '네이버 광고 서비스',
          subtitle: '다양한 네이버 광고 솔루션으로 최적의 마케팅 성과를 달성하세요',
          powerlink: {
            title: '검색광고 (파워링크)',
            description: '네이버 검색결과 상단과 우측에 노출되는 키워드 광고로 높은 전환율을 보장합니다.',
            features: ['키워드 광고', 'PC/모바일 최적화', '지역 타겟팅', '시간대별 노출 조절']
          },
          brand: {
            title: '브랜드검색 광고',
            description: '브랜드명 검색 시 상단에 노출되는 프리미엄 광고 영역입니다.',
            features: ['브랜드 보호', '이미지/동영상 소재', '높은 CTR', '브랜드 인지도 향상']
          },
          shopping: {
            title: '쇼핑검색 광고',
            description: '네이버 쇼핑에서 상품 검색 시 상단에 노출되는 이커머스 전용 광고입니다.',
            features: ['상품 등록', '가격 비교', '쇼핑몰 연동', '구매 전환 최적화']
          },
          display: {
            title: '디스플레이 광고',
            description: '네이버 메인과 각종 서비스에 노출되는 배너 광고로 브랜드 인지도를 높입니다.',
            features: ['배너 광고', '네이티브 광고', '동영상 광고', '타겟 오디언스']
          }
        },
        benefits: {
          title: '네이버 광고의 장점',
          domestic: {
            title: '국내 검색 1위',
            description: '한국인이 가장 많이 사용하는 검색엔진에서 높은 노출과 클릭률을 보장합니다.'
          },
          korean: {
            title: '정확한 한국인 타겟팅',
            description: '한국 사용자의 검색 패턴과 소비 행동을 정확히 분석한 타겟팅이 가능합니다.'
          },
          platform: {
            title: '모바일 최적화',
            description: '모바일 사용자가 많은 네이버 환경에 최적화된 광고 전략을 제공합니다.'
          },
          content: {
            title: '상세한 리포팅',
            description: '네이버 애널리틱스와 연동하여 상세한 성과 분석과 리포팅을 제공합니다.'
          }
        },
        caseStudy: {
          title: '성공 사례',
          company: '로컬 교육업체 B사',
          challenge: '지역 고객 유치와 온라인 수강생 증대',
          solution: '지역 키워드 + 브랜드검색 + 네이버 블로그 마케팅 통합',
          resultsTitle: '달성 결과'
        }
      },
      metaAds: {
        title: '메타 광고',
        description: '페이스북과 인스타그램을 활용한 소셜미디어 마케팅과 타겟 광고',
        heroTitle: '메타 광고로 소셜미디어를 정복하세요',
        heroDescription: '페이스북과 인스타그램을 통해 38억 명의 글로벌 사용자에게 도달하세요. 창의적인 콘텐츠와 정밀한 타겟팅으로 브랜드의 성장을 가속화합니다.',
        brandName: 'Meta Ads',
        dashboard: 'Meta Ads 대시보드',
        serviceTypes: {
          title: '메타 광고 서비스',
          subtitle: '다양한 메타 광고 솔루션으로 최적의 소셜 마케팅 성과를 달성하세요',
          facebook: {
            title: '페이스북 광고',
            description: '전 세계 최대 SNS 플랫폼에서 다양한 연령대와 관심사의 사용자에게 도달하는 광고입니다.',
            features: ['뉴스피드 광고', '다양한 타겟팅', '비디오/이미지 광고', '전환 최적화']
          },
          instagram: {
            title: '인스타그램 광고',
            description: '시각적 콘텐츠에 최적화된 인스타그램에서 젊은 연령층과 브랜드 지향적 고객을 타겟합니다.',
            features: ['스토리 광고', '리일 광고', '쇼핑 광고', '인플루언서 마케팅']
          },
          messenger: {
            title: '메신저 광고',
            description: '메신저를 통한 1:1 고객 소통으로 더욱 친밀한 고객 경험을 제공합니다.',
            features: ['챗봇 자동화', '1:1 고객 상담', '맞춤형 메시지', '즉시 고객 지원']
          },
          audience: {
            title: '오디언스 네트워크',
            description: '메타 파트너 사이트와 앱에서 리타겟팅과 유사 오디언스 타겟팅을 진행합니다.',
            features: ['리타겟팅 광고', '유사 오디언스', '사이트 외부 노출', '전환 추적']
          }
        },
        benefits: {
          title: '메타 광고의 장점',
          global: {
            title: '전 세계 네트워크',
            description: '페이스북과 인스타그램을 통해 전 세계 38억 명의 사용자에게 도달할 수 있습니다.'
          },
          targeting: {
            title: '정밀 타겟팅',
            description: '사용자의 관심사, 행동 패턴, 인구통계학적 데이터를 기반으로 정밀한 타겟팅이 가능합니다.'
          },
          creative: {
            title: '창의적 콘텐츠',
            description: '시각적으로 매력적인 이미지와 비디오 콘텐츠로 높은 참여도를 달성합니다.'
          },
          engagement: {
            title: '높은 참여도',
            description: '좋아요, 댓글, 공유 등 다양한 인터랙션을 통해 브랜드 인지도를 높입니다.'
          }
        },
        caseStudy: {
          title: '성공 사례',
          company: '패션 이커머스 C사',
          challenge: '브랜드 인지도 향상과 온라인 매출 증대',
          solution: '인스타그램 쇼핑 + 페이스북 리타겟팅 + 인플루언서 마케팅',
          resultsTitle: '달성 결과'
        }
      },
      kakaoAds: {
        title: '카카오 광고',
        description: '카카오톡, 카카오스토리 등 카카오 플랫폼을 통한 모바일 마케팅',
        heroTitle: '카카오 광고로 일상 속에서 고객을 만나세요',
        heroDescription: '4,700만 명이 매일 사용하는 카카오톡을 통해 고객과 더욱 친밀하게 소통하세요. 개인화된 메시지와 자연스러운 광고 노출로 높은 참여도를 달성합니다.',
        brandName: 'Kakao Ads',
        dashboard: 'Kakao Ads 대시보드',
        serviceTypes: {
          title: '카카오 광고 서비스',
          subtitle: '다양한 카카오 광고 솔루션으로 모바일 마케팅 성과를 극대화하세요',
          talk: {
            title: '카카오톡 비즈메시지',
            description: '카카오톡 채널을 통해 고객에게 직접 메시지를 전송하여 1:1 맞춤 마케팅을 진행합니다.',
            features: ['카카오톡 채널', '카카오톡 비즈보드', '열린채팅방', '지인 추천']
          },
          bizboard: {
            title: '비즈보드 광고',
            description: '카카오톡 채팅방 리스트 상단에 노출되는 광고로 높은 시인성을 보장합니다.',
            features: ['채팅방 리스트 노출', '기업 정보 연동', '로컬 비즈니스', '상세 정보 제공']
          },
          display: {
            title: '디스플레이 광고',
            description: '카카오 서비스 내 다양한 영역에 노출되는 배너 광고로 브랜드 인지도를 높입니다.',
            features: ['카카오톡 탭', '카카오스토리', '다음 메인', '모바일 웹']
          },
          shopping: {
            title: '카카오 쇼핑',
            description: '카카오 쇼핑 플랫폼에서 상품 판매와 마케팅을 동시에 진행합니다.',
            features: ['상품 등록', '카카오톡 쇼핑하기', '리뷰 관리', '결제 연동']
          }
        },
        benefits: {
          title: '카카오 광고의 장점',
          daily: {
            title: '일상 속 소통',
            description: '카카오톡은 한국인이 매일 사용하는 필수 앱으로 자연스러운 광고 노출이 가능합니다.'
          },
          messaging: {
            title: '친밀한 메시지',
            description: '1:1 대화 형태의 마케팅으로 고객과의 신뢰 관계를 구축하고 높은 참여도를 달성합니다.'
          },
          mobile: {
            title: '모바일 최적화',
            description: '모바일 환경에 최적화된 광고 형태로 모바일 사용자에게 효과적으로 도달합니다.'
          },
          local: {
            title: '로컬 비즈니스',
            description: '지역 기반 사업에 특화된 마케팅 도구로 주변 고객을 효과적으로 유치할 수 있습니다.'
          }
        },
        caseStudy: {
          title: '성공 사례',
          company: '로컬 카페 D사',
          challenge: '지역 고객 유치와 매장 방문 증대',
          solution: '카카오톡 비즈메시지 + 비즈보드 + 위치 기반 타겟팅',
          resultsTitle: '달성 결과'
        }
      },
      learnMore: '자세히 보기',
      contactCta: '무료 상담 신청',
      portfolioCta: '성공 사례 보기',
    },
    stats: {
      title: '뛰어난 성과로 입증된 전문성',
      subtitle: '200여 개 고객사와 함께 성장하며 축적한 경험과 노하우',
      projects: '성공 프로젝트',
      roas: '평균 ROAS',
      revenue: '누적 매출 기여',
      satisfaction: '고객 만족도',
    },
    portfolio: {
      title: '성공 사례',
      subtitle: '다양한 업종의 고객사와 함께한 성공적인 마케팅 캠페인 사례를 확인하세요',
      viewAll: '모든 포트폴리오 보기',
      viewCase: '사례 보기',
      clients: {
        title: '도대체 무슨 자신감으로?',
        subtitle: '오직 결과로 증명하겠습니다.',
        description: '다양한 업종의 기업들과 함께 성장한 성공 사례들을 확인해보세요',
        successfulClients: '성공한 클라이언트',
        successfulCampaigns: '성공한 캠페인',
        averageGrowth: '평균 매출 성장률',
        viewMore: '성공 사례 더 보기',
      },
    },
    about: {
      title: '데이터로 증명하는\n마케팅 파트너십',
      description: '뷰리드AI는 단순한 광고 대행사를 넘어, 고객의 비즈니스 성장을 위한 전략적 파트너입니다. 데이터 분석과 AI 기술을 바탕으로 최적의 마케팅 솔루션을 제공합니다.',
      feature1: {
        title: '데이터 기반 의사결정',
        description: '모든 마케팅 활동을 데이터로 측정하고 분석하여 지속적으로 최적화합니다',
      },
      feature2: {
        title: '자동화 시스템',
        description: 'AI 기술을 활용한 자동화로 효율성을 극대화하고 인적 오류를 최소화합니다',
      },
      feature3: {
        title: '전담 전문가팀',
        description: '각 플랫폼 전문가들이 협업하여 통합적이고 일관된 마케팅을 진행합니다',
      },
      learnMore: '회사 소개 자세히 보기',
    },
    blog: {
      title: '마케팅 인사이트',
      subtitle: '최신 마케팅 트렌드와 실무 노하우를 공유합니다',
      viewAll: '모든 포스트 보기',
      readMore: '읽어보기',
    },
    contact: {
      title: '프로젝트 문의',
      subtitle: '무료 컨설팅을 통해 맞춤형 마케팅 전략을 제안해드립니다',
      form: {
        nameLabel: '이름 *',
        namePlaceholder: '홍길동',
        phoneLabel: '연락처 *',
        phonePlaceholder: '010-1234-5678',
        emailLabel: '이메일 *',
        emailPlaceholder: 'example@company.com',
        budgetLabel: '예산 (선택사항)',
        messageLabel: '프로젝트 내용 *',
        messagePlaceholder: '어떤 마케팅 목표를 가지고 계신지, 현재 어려움은 무엇인지 자세히 알려주세요. 더 정확한 컨설팅을 제공해드릴 수 있습니다.',
        privacyLabel: '개인정보 수집 및 이용에 동의합니다.',
        privacyLink: '개인정보 처리방침 보기',
        submitButton: '무료 컨설팅 신청하기',
        responseTime: '보통 24시간 이내에 연락드립니다.',
        success: '문의가 접수되었습니다. 곧 연락드리겠습니다!',
        error: '문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.',
      },
      phone: {
        title: '전화 문의',
        value: '02-1234-5678',
        hours: '평일 09:00-18:00',
      },
      email: {
        title: '이메일 문의',
        value: 'contact@beauleadai.co.kr',
        response: '24시간 이내 답변',
      },
      location: {
        title: '오시는 길',
        value: '서울시 강남구\n테헤란로 123',
        link: '상세 위치 보기',
      },
    },
    footer: {
      company: {
        name: '뷰리드AI',
        description: '데이터 기반 퍼포먼스 마케팅으로 고객의 비즈니스 성장을 돕는 전문 에이전시입니다.',
        title: '회사',
        about: '회사소개',
        philosophy: '기업철학',
        leadership: '회사인사말',
        careers: '채용정보',
      },
      services: {
        title: '서비스',
        googleAds: '구글 광고',
        naverAds: '네이버 광고',
        metaAds: '메타 광고',
        kakaoAds: '카카오 광고',
      },
      resources: {
        title: '리소스',
        blog: '블로그',
        portfolio: '포트폴리오',
        contact: '프로젝트 문의',
        location: '오시는 길',
      },
      legal: {
        privacy: '개인정보처리방침',
        terms: '이용약관',
      },
      copyright: '© 2024 뷰리드AI. All rights reserved.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      philosophy: 'Philosophy',
      leadership: 'Leadership',
      profile: 'Profile',
      location: 'Location',
      history: 'History',
      services: 'Services',
      googleAds: 'Google Ads',
      naverAds: 'Naver Ads',
      metaAds: 'Meta Ads',
      kakaoAds: 'Kakao Ads',
      blog: 'Blog',
      portfolio: 'Portfolio',
      contact: 'Contact',
      careers: 'Careers',
      signIn: 'Sign In',
      dashboard: 'Dashboard',
    },
    hero: {
      title: 'Data-Driven\nPerformance Marketing\nSpecialist',
      subtitle: 'Achieve revenue growth and brand expansion through\nGoogle, Naver, Meta, and Kakao advertising',
      cta1: 'Get Free Consultation',
      cta2: 'View Portfolio',
    },
    services: {
      title: 'Professional Marketing Services',
      subtitle: 'We deeply understand each platform\'s characteristics and deliver optimal results through data analysis',
      googleAds: {
        title: 'Google Ads',
        description: 'Integrated marketing leveraging Google ecosystem from search ads to display and shopping ads',
        heroTitle: 'Reach More Customers with Google Ads',
        heroDescription: 'Reach your precise target audience on Google, used by 9 billion people worldwide. We provide all Google advertising solutions including Search, Display, Shopping, and YouTube.',
        brandName: 'Google Ads',
        dashboard: 'Google Ads Dashboard',
        serviceTypes: {
          title: 'Google Advertising Services',
          subtitle: 'Achieve optimal marketing performance with various Google advertising solutions',
          search: {
            title: 'Search Ads',
            description: 'Text ads that appear at the top of Google search results, targeting customers with high purchase intent.',
            features: ['Keyword Targeting', 'Ad Extensions', 'Automated Bidding', 'Quality Score Optimization']
          },
          display: {
            title: 'Display Ads',
            description: 'Image and video ads displayed on Google partner sites and YouTube.',
            features: ['Visual Creative', 'Retargeting', 'Demographic Targeting', 'Placement Selection']
          },
          shopping: {
            title: 'Shopping Ads',
            description: 'Product ads with images and prices, optimized for e-commerce.',
            features: ['Product Feed Management', 'Price Comparison', 'Visual Appeal', 'Direct Purchase Drive']
          },
          youtube: {
            title: 'YouTube Ads',
            description: 'Promote your brand with video content on YouTube, the world\'s second-largest search engine.',
            features: ['Video Content', 'Skippable/Non-skippable', 'Influencer Collaboration', 'Brand Awareness']
          }
        },
        benefits: {
          title: 'Google Ads Benefits',
          targeting: {
            title: 'Precise Targeting',
            description: 'Target exact customers based on search keywords, location, age, interests, and various other criteria.'
          },
          realtime: {
            title: 'Real-time Performance Tracking',
            description: 'Monitor and optimize all metrics including clicks, impressions, and conversion rates in real-time.'
          },
          costEffective: {
            title: 'Cost Efficiency',
            description: 'Automated bidding system optimizes to achieve maximum performance within your set budget.'
          },
          global: {
            title: 'Global Reach',
            description: 'Expose your ads to 9 billion Google users worldwide.'
          }
        },
        caseStudy: {
          title: 'Success Story',
          company: 'Fashion E-commerce Company A',
          challenge: 'New customer acquisition and revenue growth',
          solution: 'Integrated strategy of Search Ads + Shopping Ads + Remarketing',
          resultsTitle: 'Results Achieved'
        }
      },
      naverAds: {
        title: 'Naver Ads',
        description: 'Search ads, shopping ads, and brand search optimization on Korea\'s largest search engine',
        heroTitle: 'Target Korean Customers Precisely with Naver Ads',
        heroDescription: 'Execute marketing optimized for Korean customers on Naver, Korea\'s #1 search engine. We provide all Naver advertising solutions including PowerLink, Brand Search, and Shopping Search.',
        brandName: 'Naver Ads',
        dashboard: 'Naver Ads Dashboard',
        serviceTypes: {
          title: 'Naver Advertising Services',
          subtitle: 'Achieve optimal marketing performance with various Naver advertising solutions',
          powerlink: {
            title: 'Search Ads (PowerLink)',
            description: 'Keyword ads displayed at the top and right of Naver search results, ensuring high conversion rates.',
            features: ['Keyword Advertising', 'PC/Mobile Optimization', 'Regional Targeting', 'Time-based Exposure Control']
          },
          brand: {
            title: 'Brand Search Ads',
            description: 'Premium advertising space displayed at the top when searching for brand names.',
            features: ['Brand Protection', 'Image/Video Materials', 'High CTR', 'Brand Awareness Enhancement']
          },
          shopping: {
            title: 'Shopping Search Ads',
            description: 'E-commerce dedicated ads displayed at the top when searching for products on Naver Shopping.',
            features: ['Product Registration', 'Price Comparison', 'Shopping Mall Integration', 'Purchase Conversion Optimization']
          },
          display: {
            title: 'Display Ads',
            description: 'Banner ads displayed on Naver main page and various services to increase brand awareness.',
            features: ['Banner Ads', 'Native Ads', 'Video Ads', 'Target Audience']
          }
        },
        benefits: {
          title: 'Naver Ads Benefits',
          domestic: {
            title: 'Korea\'s #1 Search Engine',
            description: 'Guarantee high exposure and click-through rates on the search engine most used by Koreans.'
          },
          korean: {
            title: 'Precise Korean User Targeting',
            description: 'Enable precise targeting by accurately analyzing Korean users\' search patterns and consumption behaviors.'
          },
          platform: {
            title: 'Mobile Optimization',
            description: 'Provide advertising strategies optimized for the Naver environment with many mobile users.'
          },
          content: {
            title: 'Detailed Reporting',
            description: 'Provide detailed performance analysis and reporting by integrating with Naver Analytics.'
          }
        },
        caseStudy: {
          title: 'Success Story',
          company: 'Local Education Company B',
          challenge: 'Regional customer acquisition and online student enrollment increase',
          solution: 'Integrated regional keywords + brand search + Naver blog marketing',
          resultsTitle: 'Results Achieved'
        }
      },
      metaAds: {
        title: 'Meta Ads',
        description: 'Social media marketing and targeted advertising using Facebook and Instagram',
        heroTitle: 'Conquer Social Media with Meta Ads',
        heroDescription: 'Reach 3.8 billion global users through Facebook and Instagram. Accelerate your brand growth with creative content and precise targeting.',
        brandName: 'Meta Ads',
        dashboard: 'Meta Ads Dashboard',
        serviceTypes: {
          title: 'Meta Advertising Services',
          subtitle: 'Achieve optimal social marketing performance with various Meta advertising solutions',
          facebook: {
            title: 'Facebook Ads',
            description: 'Reach users of various ages and interests on the world\'s largest social media platform.',
            features: ['News Feed Ads', 'Diverse Targeting', 'Video/Image Ads', 'Conversion Optimization']
          },
          instagram: {
            title: 'Instagram Ads',
            description: 'Target young demographics and brand-oriented customers on visual content-optimized Instagram.',
            features: ['Story Ads', 'Reel Ads', 'Shopping Ads', 'Influencer Marketing']
          },
          messenger: {
            title: 'Messenger Ads',
            description: 'Provide more intimate customer experiences through 1:1 customer communication via Messenger.',
            features: ['Chatbot Automation', '1:1 Customer Support', 'Personalized Messages', 'Instant Customer Service']
          },
          audience: {
            title: 'Audience Network',
            description: 'Conduct retargeting and lookalike audience targeting on Meta partner sites and apps.',
            features: ['Retargeting Ads', 'Lookalike Audiences', 'Off-site Exposure', 'Conversion Tracking']
          }
        },
        benefits: {
          title: 'Meta Ads Benefits',
          global: {
            title: 'Global Network',
            description: 'Reach 3.8 billion users worldwide through Facebook and Instagram.'
          },
          targeting: {
            title: 'Precise Targeting',
            description: 'Enable precise targeting based on user interests, behavior patterns, and demographic data.'
          },
          creative: {
            title: 'Creative Content',
            description: 'Achieve high engagement with visually appealing images and video content.'
          },
          engagement: {
            title: 'High Engagement',
            description: 'Increase brand awareness through various interactions like likes, comments, and shares.'
          }
        },
        caseStudy: {
          title: 'Success Story',
          company: 'Fashion E-commerce Company C',
          challenge: 'Brand awareness improvement and online sales increase',
          solution: 'Instagram Shopping + Facebook Retargeting + Influencer Marketing',
          resultsTitle: 'Results Achieved'
        }
      },
      kakaoAds: {
        title: 'Kakao Ads',
        description: 'Mobile marketing through Kakao platforms including KakaoTalk and KakaoStory',
        heroTitle: 'Meet Customers in Daily Life with Kakao Ads',
        heroDescription: 'Communicate more intimately with customers through KakaoTalk, used daily by 47 million people. Achieve high engagement with personalized messages and natural ad exposure.',
        brandName: 'Kakao Ads',
        dashboard: 'Kakao Ads Dashboard',
        serviceTypes: {
          title: 'Kakao Advertising Services',
          subtitle: 'Maximize mobile marketing performance with various Kakao advertising solutions',
          talk: {
            title: 'KakaoTalk Biz Message',
            description: 'Send direct messages to customers through KakaoTalk channels for 1:1 personalized marketing.',
            features: ['KakaoTalk Channel', 'KakaoTalk BizBoard', 'Open Chat', 'Friend Recommendations']
          },
          bizboard: {
            title: 'BizBoard Ads',
            description: 'Ads displayed at the top of KakaoTalk chat room lists, ensuring high visibility.',
            features: ['Chat Room List Exposure', 'Business Info Integration', 'Local Business', 'Detailed Information']
          },
          display: {
            title: 'Display Ads',
            description: 'Banner ads displayed in various areas within Kakao services to increase brand awareness.',
            features: ['KakaoTalk Tab', 'KakaoStory', 'Daum Main', 'Mobile Web']
          },
          shopping: {
            title: 'Kakao Shopping',
            description: 'Simultaneously conduct product sales and marketing on the Kakao Shopping platform.',
            features: ['Product Registration', 'KakaoTalk Shopping', 'Review Management', 'Payment Integration']
          }
        },
        benefits: {
          title: 'Kakao Ads Benefits',
          daily: {
            title: 'Daily Communication',
            description: 'KakaoTalk is an essential app used daily by Koreans, enabling natural ad exposure.'
          },
          messaging: {
            title: 'Intimate Messaging',
            description: '1:1 conversational marketing builds trust relationships with customers and achieves high engagement.'
          },
          mobile: {
            title: 'Mobile Optimization',
            description: 'Effectively reach mobile users with ad formats optimized for mobile environments.'
          },
          local: {
            title: 'Local Business',
            description: 'Effectively attract nearby customers with marketing tools specialized for location-based businesses.'
          }
        },
        caseStudy: {
          title: 'Success Story',
          company: 'Local Cafe D',
          challenge: 'Regional customer acquisition and store visit increase',
          solution: 'KakaoTalk Biz Message + BizBoard + Location-based Targeting',
          resultsTitle: 'Results Achieved'
        }
      },
      learnMore: 'Learn More',
      contactCta: 'Get Free Consultation',
      portfolioCta: 'View Success Stories',
    },
    stats: {
      title: 'Expertise Proven by Outstanding Results',
      subtitle: 'Experience and know-how accumulated by growing with over 200 clients',
      projects: 'Successful Projects',
      roas: 'Average ROAS',
      revenue: 'Cumulative Revenue Contribution',
      satisfaction: 'Customer Satisfaction',
    },
    portfolio: {
      title: 'Success Stories',
      subtitle: 'Check out successful marketing campaign cases with clients from various industries',
      viewAll: 'View All Portfolio',
      viewCase: 'View Case',
      clients: {
        title: 'What gives us such confidence?',
        subtitle: 'We will prove it only with results.',
        description: 'Check out our success stories growing together with companies from various industries',
        successfulClients: 'Successful Clients',
        successfulCampaigns: 'Successful Campaigns',
        averageGrowth: 'Average Revenue Growth',
        viewMore: 'View More Success Stories',
      },
    },
    about: {
      title: 'Marketing Partnership\nProven by Data',
      description: 'BeauLeadAI goes beyond a simple advertising agency to become a strategic partner for customer business growth. We provide optimal marketing solutions based on data analysis and AI technology.',
      feature1: {
        title: 'Data-Driven Decision Making',
        description: 'Measure and analyze all marketing activities with data for continuous optimization',
      },
      feature2: {
        title: 'Automation Systems',
        description: 'Maximize efficiency and minimize human error through AI-powered automation',
      },
      feature3: {
        title: 'Dedicated Expert Team',
        description: 'Platform specialists collaborate to deliver integrated and consistent marketing',
      },
      learnMore: 'Learn More About Us',
    },
    blog: {
      title: 'Marketing Insights',
      subtitle: 'We share the latest marketing trends and practical know-how',
      viewAll: 'View All Posts',
      readMore: 'Read More',
    },
    contact: {
      title: 'Project Inquiry',
      subtitle: 'We propose customized marketing strategies through free consultation',
      form: {
        nameLabel: 'Name *',
        namePlaceholder: 'John Doe',
        phoneLabel: 'Phone *',
        phonePlaceholder: '010-1234-5678',
        emailLabel: 'Email *',
        emailPlaceholder: 'example@company.com',
        budgetLabel: 'Budget (Optional)',
        messageLabel: 'Project Details *',
        messagePlaceholder: 'Please tell us in detail about your marketing goals and current challenges. We can provide more accurate consulting.',
        privacyLabel: 'I agree to the collection and use of personal information.',
        privacyLink: 'View Privacy Policy',
        submitButton: 'Apply for Free Consultation',
        responseTime: 'We usually contact you within 24 hours.',
        success: 'Your inquiry has been submitted. We will contact you soon!',
        error: 'An error occurred while submitting your inquiry. Please try again.',
      },
      phone: {
        title: 'Phone Inquiry',
        value: '02-1234-5678',
        hours: 'Weekdays 09:00-18:00',
      },
      email: {
        title: 'Email Inquiry',
        value: 'contact@beauleadai.co.kr',
        response: 'Response within 24 hours',
      },
      location: {
        title: 'Visit Us',
        value: 'Gangnam-gu, Seoul\nTeheran-ro 123',
        link: 'View Detailed Location',
      },
    },
    footer: {
      company: {
        name: 'BeauLeadAI',
        description: 'A professional agency that helps customer business growth through data-driven performance marketing.',
        title: 'Company',
        about: 'About',
        philosophy: 'Philosophy',
        leadership: 'Leadership',
        careers: 'Careers',
      },
      services: {
        title: 'Services',
        googleAds: 'Google Ads',
        naverAds: 'Naver Ads',
        metaAds: 'Meta Ads',
        kakaoAds: 'Kakao Ads',
      },
      resources: {
        title: 'Resources',
        blog: 'Blog',
        portfolio: 'Portfolio',
        contact: 'Contact',
        location: 'Location',
      },
      legal: {
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
      },
      copyright: '© 2024 BeauLeadAI. All rights reserved.',
    },
  },
};

export function getTranslation(language: Language): Translations {
  return translations[language];
}

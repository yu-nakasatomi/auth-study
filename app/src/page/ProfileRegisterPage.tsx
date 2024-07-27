import { FC, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth, type Profile } from '../auth/AuthProvider';

const departmentList = [
  { id: 1, name: "開発部門" },
  { id: 2, name: "運用部門" },
  { id: 3, name: "サポート部門" },
  { id: 4, name: "インフラ部門" },
  { id: 5, name: "セキュリティ部門" },
  { id: 6, name: "品質保証（QA）部門" },
  { id: 7, name: "データサイエンス部門" },
  { id: 8, name: "ネットワークエンジニアリング部門" },
  { id: 9, name: "プロダクトマネジメント部門" },
];

const skillList = [
  { id: 1, name: "Python" },
  { id: 2, name: "AWS" },
  { id: 3, name: "JavaScript" },
  { id: 4, name: "SQL" },
  { id: 5, name: "HTML/CSS" },
  { id: 6, name: "Linux" },
  { id: 7, name: "Docker" },
  { id: 8, name: "Git" },
  { id: 9, name: "React" },
  { id: 10, name: "Machine Learning" },
];

const certificationList = [
  { id: 1, name: "JLPT N1" },
  { id: 2, name: "TOEIC900" },
  { id: 3, name: "LPIC-1" },
  { id: 4, name: "AWS Certified Solutions Architect" },
  { id: 5, name: "CCNA" },
  { id: 6, name: "Microsoft Certified Azure Administrator" },
];

const defaultProfile: Profile = {
  name: "",
  department_id: "",
  skill_id: "",
  certification_id: "",
  hobby: "",
  message: "",
  image_path: "",
  background_path: "",
};

const ProfileRegisterPage :FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleProfileRegister } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({defaultValues: defaultProfile});
  
  useEffect(() => {
    if (!location.state) navigate('/loading');
  }, [location.state])

  const profileRegister = async (data: Profile) => {
    const result = await handleProfileRegister(data);
    if (result.success) {
      alert("プロフィール登録が完了しました");
      navigate("/loading");
    } else {
      alert(result.message);
    }
  };
  
  return (
    <div className="flex justify-center  min-h-screen">
      <form onSubmit={handleSubmit(profileRegister)} className="bg-white p-5 rounded-lg shadow-md w-full max-w-md mt-24 ">
        <p className="text-center text-xl text-SecondaryDark">プロフィール登録</p>
        <p className="text-base text-SecondaryDark mb-2">名前</p>
        <input id="name" type="text" placeholder="入力してください" {...register("name", {required: true})} 
          className="w-full p-2 border border-gray-300 rounded"/>
        {errors.name && (
          <div className="text-Secondary text-sm pl-0.5 mt-1">入力が必須の項目です</div>
        )}
        <p className="text-base text-SecondaryDark mb-2 mt-5">所属</p>
        <select {...register("department_id", { required: true })}
          className="w-full p-2 border border-gray-300 rounded ">
          <option value="" disabled>選択してください</option>
          {departmentList.map((department) => (
            <option key={department.id} value={department.id}>{department.name}</option>
          ))}
        </select>

        <p className="text-base text-SecondaryDark mb-2 mt-5">持っているスキル</p>
        <select {...register("skill_id", { required: true })}
          className="w-full p-2 border border-gray-300 rounded ">
          <option value="" disabled>選択してください</option>
          {skillList.map((skill) => (
            <option key={skill.id} value={skill.id}>{skill.name}</option>
          ))}
        </select>

        <p className="text-base text-SecondaryDark mb-2 mt-5">持っている資格</p>
        <select {...register("certification_id", { required: true })}
          className="w-full p-2 border border-gray-300 rounded">
          <option value="" disabled>選択してください</option>
          {certificationList.map((certification) => (
            <option key={certification.id} value={certification.id}>{certification.name}</option>
          ))}
        </select>

        <p className="text-base text-SecondaryDark mb-2 mt-5">趣味</p>
        <input type="text" placeholder="入力してください" {...register("hobby", {})}
          className="w-full p-2 border border-gray-300 rounded"/>

        <p className="text-base text-SecondaryDark mb-2 mt-5">ひとこと（プロフィール上部に表示されれます）</p>
        <input type="text" placeholder="入力してください" {...register("message", {})}
          className="w-full p-2 border border-gray-300 rounded "/>

        <button type="submit" className="w-full bg-Secondary text-white h-12 rounded hover:bg-Secondary-dark mb-2 mt-5">
          登録する
        </button>
      </form>
    </div>
  );
}

export default ProfileRegisterPage;
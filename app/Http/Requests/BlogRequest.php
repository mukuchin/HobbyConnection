<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $rules = [
            'title' => ['required', 'string', 'max:2000'],
            'period_start' => ['nullable', 'date'],
            'period_end' => ['nullable', 'date'],
            'description' => ['required', 'string', 'max:5000'],
            // 'image' => ['nullable', 'mimes:jpg,jpeg,gif,png', 'max:2048'],
            'image' => ['nullable', 'mimes:jpg,jpeg,gif,png'],
            'sub_form_data.*.comment' => ['nullable', 'string'],
            // 'sub_form_data.*.image' => ['nullable', 'mimes:jpg,jpeg,gif,png', 'max:2048'],
            'sub_form_data.*.image' => ['nullable', 'mimes:jpg,jpeg,gif,png'],
        ];

        // period_end が入力されている場合のみ、after_or_equal:period_start ルールを追加
        if ($this->input('period_end')) {
            $rules['period_end'][] = 'after_or_equal:period_start';
        }

        return $rules;
    }


    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'タイトルを入力してください。',
            'title.string' => 'タイトルは文字列で入力してください。',
            'title.max' => 'タイトルは200文字以内で入力してください。',
            'period_start.date' => '開始日は日付で入力してください。',
            'period_start.before_or_equal' => '開始日は終了日以前の日付を入力してください。',
            'period_end.date' => '終了日は日付で入力してください。',
            'period_end.after_or_equal' => '終了日は開始日以降の日付を入力してください。',
            'description.required' => '概要を入力してください。',
            'description.string' => '概要は文字列で入力してください。',
            'description.max' => '概要は5000文字以内で入力してください。',
            'image.mimes' => '無効なファイル形式です。jpg, jpeg, gif, pngのみ許可されています。',
            // 'image.max' => '画像サイズは2MB以下にしてください。',
            'sub_form_data.*.comment.string' => 'コメントは文字列で入力してください。',
            'sub_form_data.*.image.mimes' => '無効なファイル形式です。jpg, jpeg, gif, pngのみ許可されています。',
            // 'sub_form_data.*.image.max' => '画像サイズは2MB以下にしてください。',
        ];
    }

    // 本番環境だと画像サイズに関するバリデーションメッセージが正常に表示されない為、以下のメソッドを追加
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            // ------------------------------------------------------------
            // 画像サイズが2MBを超えている場合、バリデーションエラーを追加
            // ------------------------------------------------------------
            $file = $this->file('image');
            if ($file && $file->getError() === UPLOAD_ERR_INI_SIZE) {
                // メインフォームの画像に関するエラーメッセージを上書き
                $validator->errors()->forget('image');
                $validator->errors()->add('image', '画像サイズは2MB以下にしてください。');
            }

            // サブフォームの画像に関するエラーメッセージを上書き
            $subFormData = $this->all()['sub_form_data'] ?? [];
            dd($subFormData);
            foreach ($subFormData as $index => $data) {
                $subFile = $data['image'] ?? null;
                if ($subFile && $subFile->getError() === UPLOAD_ERR_INI_SIZE) {
                    $key = "sub_form_data.{$index}.image";
                    $validator->errors()->forget($key);
                    $validator->errors()->add($key, '画像サイズは2MB以下にしてください。');
                }
            }

            // ------------------------------------------------------------
            // 画像の合計サイズが20MBを超えている場合、バリデーションエラーを追加。
            // ------------------------------------------------------------
            $totalSize = 0;

            // メインフォームの画像のサイズを取得
            if ($this->hasFile('image')) {
                $totalSize += $this->file('image')->getSize();
            }

            // サブフォームの画像のサイズの合計
            $subFormData = $this->all()['sub_form_data'] ?? [];
            foreach ($subFormData as $data) {
                if (isset($data['image']) && $data['image'] instanceof \Illuminate\Http\UploadedFile) {
                    $totalSize += $data['image']->getSize();
                }
            }

            // 合計サイズが20MBを超えている場合、バリデーションエラーを追加
            if ($totalSize > 20 * 1024 * 1024) {
                $validator->errors()->add('total_image_size', '一度の投稿・更新で追加する画像の合計サイズは20MB以下にしてください。');
            }

        });
    }
}
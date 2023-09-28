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
            'title' => ['required', 'string', 'max:100'],
            'period_start' => ['nullable', 'date'],
            'period_end' => ['nullable', 'date'],
            'description' => ['required', 'string', 'max:1000'],
            'image' => ['nullable', 'mimes:jpg,jpeg,gif,png', 'max:2048'],
            'sub_form_data.*.comment' => ['nullable', 'string'],
            'sub_form_data.*.image' => ['nullable', 'mimes:jpg,jpeg,gif,png', 'max:2048'],
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
            'title.max' => 'タイトルは100文字以内で入力してください。',
            'period_start.date' => '開始日は日付で入力してください。',
            'period_start.before_or_equal' => '開始日は終了日以前の日付を入力してください。',
            'period_end.date' => '終了日は日付で入力してください。',
            'period_end.after_or_equal' => '終了日は開始日以降の日付を入力してください。',
            'description.required' => '概要を入力してください。',
            'description.string' => '概要は文字列で入力してください。',
            'description.max' => '概要は1000文字以内で入力してください。',
            'image.mimes' => '無効なファイル形式です。jpg, jpeg, gif, pngのみ許可されています。',
            'image.max' => '画像サイズは2MB以下である必要があります。',
            'sub_form_data.*.comment.string' => 'コメントは文字列で入力してください。',
            'sub_form_data.*.image.mimes' => '無効なファイル形式です。jpg, jpeg, gif, pngのみ許可されています。',
            'sub_form_data.*.image.max' => '画像サイズは2MB以下である必要があります。',
        ];
    }
}

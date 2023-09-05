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
        return [
            'title' => ['required', 'string', 'max:100'],
            'period_start' => ['required', 'date', 'before_or_equal:period_end'],
            'period_end' => ['required', 'date', 'after_or_equal:period_start'],
            'description' => ['required', 'string', 'max:1000'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'タイトルを入力してください',
            'title.string' => 'タイトルは文字列で入力してください',
            'title.max' => 'タイトルは100文字以内で入力してください',
            'period_start.required' => '開始日を入力してください',
            'period_start.date' => '開始日は日付で入力してください',
            'period_start.before_or_equal' => '開始日は終了日以前の日付を入力してください',
            'period_end.required' => '終了日を入力してください',
            'period_end.date' => '終了日は日付で入力してください',
            'period_end.after_or_equal' => '終了日は開始日以降の日付を入力してください',
            'description.required' => '概要を入力してください',
            'description.string' => '概要は文字列で入力してください',
            'description.max' => '概要は1000文字以内で入力してください',
        ];
    }
}